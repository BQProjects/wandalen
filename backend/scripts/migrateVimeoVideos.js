const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

// Import your VideoModel
const VideoModel = require("../models/videoModel");

/**
 * Vimeo Video Migration Script
 *
 * This script fetches all videos from your Vimeo account and imports them into MongoDB
 * It extracts: title, description, thumbnail, tags, duration, and video URL
 */

const VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN;
const VIMEO_API_BASE = "https://api.vimeo.com";
const MONGODB_URI = process.env.MONGODB_URI;

// Helper function to parse location data from tags or description
const parseLocationData = (tags, description) => {
  const data = {
    province: "",
    municipality: "",
    location: "",
    tags: [],
  };

  // List of Dutch provinces
  const provinces = [
    "Drenthe",
    "Flevoland",
    "Friesland",
    "Gelderland",
    "Groningen",
    "Limburg",
    "Noord-Brabant",
    "Noord-Holland",
    "Overijssel",
    "Utrecht",
    "Zeeland",
    "Zuid-Holland",
  ];

  // Combine tags and description for searching
  const allText = [...tags, description].join(" ");

  // Extract province
  provinces.forEach((prov) => {
    if (allText.includes(prov)) {
      data.province = prov;
    }
  });

  // Extract municipality (if "Gemeente" is mentioned)
  const gemeenteMatch = allText.match(/Gemeente\s+([A-Za-z\-\s]+?)(?:\s|$)/i);
  if (gemeenteMatch) {
    data.municipality = gemeenteMatch[1].trim();
  }

  // Extract location from tags (exclude province and gemeente tags)
  data.tags = tags.filter(
    (tag) =>
      !tag.toLowerCase().includes("provincie") &&
      !tag.toLowerCase().includes("gemeente") &&
      !provinces.includes(tag)
  );

  return data;
};

// Helper function to extract nature type from tags
const extractNatureType = (tags) => {
  const natureTypes = {
    Bos: ["bos", "forest"],
    Heide: ["heide", "heath"],
    Duinen: ["duinen", "dunes"],
    Grasland: ["grasland", "weiland", "weide", "meadow"],
    Water: ["water", "rivier", "meren", "meer", "vijver", "plas"],
    Moeras: ["moeras", "marsh"],
    Strand: ["strand", "beach", "kust"],
    Park: ["park", "stadsgroen"],
  };

  const allTags = tags.join(" ").toLowerCase();

  for (const [nature, keywords] of Object.entries(natureTypes)) {
    for (const keyword of keywords) {
      if (allTags.includes(keyword.toLowerCase())) {
        return nature;
      }
    }
  }
  return "";
};

// Helper function to extract animals from tags
const extractAnimals = (tags) => {
  const animalKeywords = {
    Vogels: ["vogel", "bird", "ganzen", "eend"],
    Schapen: ["schapen", "schaap", "sheep"],
    Koeien: ["koeien", "koe", "cow"],
    Herten: ["hert", "deer"],
    Insecten: ["insecten", "vlinder", "libel", "bij"],
    Amfibieën: ["kikker", "pad", "salamander"],
    Vissen: ["vis", "ijsvogel"],
    Roofvogels: ["roofvogel", "buizerd", "sperwer"],
  };

  const allTags = tags.join(" ").toLowerCase();
  const foundAnimals = [];

  for (const [animal, keywords] of Object.entries(animalKeywords)) {
    for (const keyword of keywords) {
      if (allTags.includes(keyword.toLowerCase())) {
        if (!foundAnimals.includes(animal)) {
          foundAnimals.push(animal);
        }
        break;
      }
    }
  }

  return foundAnimals.join(", ");
};

// Helper function to extract sound stimuli from tags
const extractSound = (tags, description) => {
  const soundKeywords = {
    Water: ["water", "rivier", "beek", "regen"],
    Wind: ["wind", "rustig briesje"],
    Vogels: ["vogel", "bird", "ganzen"],
    Krekels: ["krekel", "cricket"],
    Insecten: ["insecten", "bijen", "wespen"],
  };

  const allText = [...tags, description].join(" ").toLowerCase();
  const foundSounds = [];

  for (const [sound, keywords] of Object.entries(soundKeywords)) {
    for (const keyword of keywords) {
      if (allText.includes(keyword.toLowerCase())) {
        if (!foundSounds.includes(sound)) {
          foundSounds.push(sound);
        }
        break;
      }
    }
  }

  return foundSounds.join(", ");
};

// Helper function to extract season from tags or description
const extractSeason = (tags, description) => {
  const seasons = {
    winter: "winter",
    lente: "spring",
    spring: "spring",
    zomer: "summer",
    summer: "summer",
    herfst: "autumn",
    autumn: "autumn",
  };

  const allText = [...tags, description].join(" ").toLowerCase();

  for (const [key, value] of Object.entries(seasons)) {
    if (allText.includes(key)) {
      return value;
    }
  }
  return "";
};

// Fetch all videos from Vimeo
async function fetchAllVimeoVideos() {
  try {
    console.log("Fetching videos from Vimeo...\n");

    let allVideos = [];
    let page = 1;
    let hasMore = true;
    const perPage = 100;

    while (hasMore) {
      const response = await axios.get(`${VIMEO_API_BASE}/me/videos`, {
        headers: {
          Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
        params: {
          page,
          per_page: perPage,
          fields:
            "uri,name,description,duration,pictures,tags,link,privacy,player_embed_url,created_time",
        },
      });

      const videos = response.data.data;
      allVideos = allVideos.concat(videos);

      console.log(`Fetched page ${page}: ${videos.length} videos`);

      // Check if there are more pages
      if (videos.length < perPage || !response.data.paging.next) {
        hasMore = false;
      } else {
        page++;
      }
    }

    console.log(`\nTotal videos fetched: ${allVideos.length}\n`);
    return allVideos;
  } catch (error) {
    console.error(
      "Error fetching videos from Vimeo:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Transform Vimeo video data to MongoDB format
function transformVideoData(vimeoVideo) {
  const videoId = vimeoVideo.uri.split("/").pop();

  // Get thumbnail URL (use the largest available)
  let thumbnailUrl = "";
  if (vimeoVideo.pictures && vimeoVideo.pictures.sizes) {
    const sizes = vimeoVideo.pictures.sizes;
    thumbnailUrl = sizes[sizes.length - 1]?.link || "";
  }

  // Extract tags
  const tags = vimeoVideo.tags ? vimeoVideo.tags.map((t) => t.name) : [];

  // Parse location data
  const locationData = parseLocationData(tags, vimeoVideo.description || "");

  // Extract nature type and season
  const natureType = extractNatureType(tags);
  const season = extractSeason(tags, vimeoVideo.description || "");
  const animals = extractAnimals(tags);
  const sound = extractSound(tags, vimeoVideo.description || "");

  // Construct embed URL with privacy hash
  const privacyHash =
    vimeoVideo.player_embed_url?.split("?h=")[1]?.split("&")[0] || "";
  const embedParams = `?h=${privacyHash}&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
  const videoUrl = `https://player.vimeo.com/video/${videoId}${embedParams}`;

  // Convert duration from seconds to minutes (store as NUMBER, not string)
  const durationInMinutes = vimeoVideo.duration
    ? Math.round(vimeoVideo.duration / 60)
    : 0;

  return {
    title: vimeoVideo.name,
    description: vimeoVideo.description || "",
    url: videoUrl,
    imgUrl: thumbnailUrl,
    duration: durationInMinutes, // Store as pure number for filtering
    tags: locationData.tags,
    province: locationData.province,
    municipality: locationData.municipality,
    location: locationData.location || "Unknown",
    nature: natureType,
    season: season,
    sound: sound, // Auto-extracted from tags
    animals: animals, // Auto-extracted from tags
    views: 0,
    likes: 0,
    isApproved: false, // Set to false for review, or true to auto-approve
    uploadedBy: null, // You can set an admin user ID here if needed
    uploaderModel: "Admin",
    createdAt: new Date(vimeoVideo.created_time),
  };
}

// Save videos to MongoDB
async function saveVideosToMongoDB(videos) {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB\n");

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (let i = 0; i < videos.length; i++) {
      const vimeoVideo = videos[i];
      const videoId = vimeoVideo.uri.split("/").pop();

      try {
        // Check if video already exists (by URL)
        const videoUrl =
          vimeoVideo.player_embed_url ||
          `https://player.vimeo.com/video/${videoId}`;
        const existingVideo = await VideoModel.findOne({
          url: { $regex: videoId, $options: "i" },
        });

        if (existingVideo) {
          console.log(
            `${i + 1}. SKIPPED: "${vimeoVideo.name}" (already exists)`
          );
          skipCount++;
          continue;
        }

        // Transform and save video
        const videoData = transformVideoData(vimeoVideo);
        const newVideo = new VideoModel(videoData);
        await newVideo.save();

        console.log(`${i + 1}. SAVED: "${vimeoVideo.name}"`);
        console.log(`   - Province: ${videoData.province || "Not found"}`);
        console.log(
          `   - Municipality: ${videoData.municipality || "Not found"}`
        );
        console.log(`   - Duration: ${videoData.duration}`);
        console.log(`   - Tags: ${videoData.tags.join(", ") || "None"}`);
        console.log("");

        successCount++;
      } catch (error) {
        console.error(
          `${i + 1}. ERROR saving "${vimeoVideo.name}":`,
          error.message
        );
        errorCount++;
      }
    }

    console.log("\n=== Migration Summary ===");
    console.log(`Total videos processed: ${videos.length}`);
    console.log(`Successfully saved: ${successCount}`);
    console.log(`Skipped (already exist): ${skipCount}`);
    console.log(`Errors: ${errorCount}`);
  } catch (error) {
    console.error("Error saving to MongoDB:", error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log("\nMongoDB connection closed");
  }
}

// Main migration function
async function migrateVimeoVideos() {
  try {
    console.log("=== Starting Vimeo to MongoDB Migration ===\n");

    // Fetch videos from Vimeo
    const vimeoVideos = await fetchAllVimeoVideos();

    if (vimeoVideos.length === 0) {
      console.log("No videos found in Vimeo account.");
      return;
    }

    // Save to MongoDB
    await saveVideosToMongoDB(vimeoVideos);

    console.log("\n=== Migration Complete! ===");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

// Run the migration
if (require.main === module) {
  migrateVimeoVideos();
}

module.exports = {
  migrateVimeoVideos,
  fetchAllVimeoVideos,
  transformVideoData,
};
