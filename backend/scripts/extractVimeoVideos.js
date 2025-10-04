const axios = require("axios");
const fs = require("fs");
const path = require("path");

/**
 * Vimeo Video Extractor
 *
 * This script extracts all video information from Vimeo and exports it to JSON/CSV
 * Use this to review video data before importing to MongoDB
 */

const VIMEO_ACCESS_TOKEN =
  process.env.VIMEO_ACCESS_TOKEN || "47f86c1de3626455750d70a90f8383b4";
const VIMEO_API_BASE = "https://api.vimeo.com";

// Fetch all videos from Vimeo with full details
async function extractAllVimeoVideos() {
  try {
    console.log("🎬 Extracting videos from Vimeo...\n");

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
            "uri,name,description,duration,pictures,tags,link,privacy,player_embed_url,created_time,categories,stats",
        },
      });

      const videos = response.data.data;
      allVideos = allVideos.concat(videos);

      console.log(`📄 Fetched page ${page}: ${videos.length} videos`);

      if (videos.length < perPage || !response.data.paging.next) {
        hasMore = false;
      } else {
        page++;
      }
    }

    console.log(`\n✅ Total videos extracted: ${allVideos.length}\n`);
    return allVideos;
  } catch (error) {
    console.error(
      "❌ Error fetching videos from Vimeo:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Extract detailed video information
function extractVideoDetails(vimeoVideo) {
  const videoId = vimeoVideo.uri.split("/").pop();

  // Get thumbnail URL (multiple sizes)
  const thumbnails =
    vimeoVideo.pictures?.sizes?.map((size) => ({
      width: size.width,
      height: size.height,
      url: size.link,
    })) || [];

  // Get the largest thumbnail
  const mainThumbnail =
    thumbnails.length > 0 ? thumbnails[thumbnails.length - 1].url : "";

  // Extract tags
  const tags = vimeoVideo.tags ? vimeoVideo.tags.map((t) => t.name) : [];

  // Extract categories
  const categories = vimeoVideo.categories
    ? vimeoVideo.categories.map((c) => c.name)
    : [];

  // Get privacy hash for embed URL
  const privacyHash =
    vimeoVideo.player_embed_url?.split("?h=")[1]?.split("&")[0] || "";
  const embedUrl = `https://player.vimeo.com/video/${videoId}?h=${privacyHash}&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;

  // Parse location information from tags
  const provincie =
    tags
      .find((tag) => tag.toLowerCase().includes("provincie"))
      ?.replace(/provincie\s*/i, "")
      .trim() || "";
  const gemeente =
    tags
      .find((tag) => tag.toLowerCase().includes("gemeente"))
      ?.replace(/gemeente\s*/i, "")
      .trim() || "";

  // Extract nature organizations
  const organizations = tags.filter(
    (tag) =>
      tag.toLowerCase().includes("natuurmonumenten") ||
      tag.toLowerCase().includes("staatsbosbeheer")
  );

  // Duration in minutes
  const durationMinutes = vimeoVideo.duration
    ? Math.round(vimeoVideo.duration / 60)
    : 0;

  return {
    // Vimeo identifiers
    vimeoId: videoId,
    vimeoLink: vimeoVideo.link,

    // Video content
    title: vimeoVideo.name,
    description: vimeoVideo.description || "",

    // Media URLs
    embedUrl: embedUrl,
    playerUrl: vimeoVideo.player_embed_url,
    thumbnail: mainThumbnail,
    allThumbnails: thumbnails,

    // Metadata
    duration: durationMinutes,
    durationFormatted: `${durationMinutes} min`,
    tags: tags,
    categories: categories,

    // Location data
    provincie: provincie,
    gemeente: gemeente,
    organizations: organizations,

    // Statistics
    plays: vimeoVideo.stats?.plays || 0,

    // Timestamps
    createdAt: vimeoVideo.created_time,

    // Privacy
    privacy: vimeoVideo.privacy?.view || "unlisted",
  };
}

// Export to JSON
function exportToJSON(videos, outputPath) {
  const detailedVideos = videos.map(extractVideoDetails);

  fs.writeFileSync(outputPath, JSON.stringify(detailedVideos, null, 2), "utf8");

  console.log(`\n💾 Exported to JSON: ${outputPath}`);
  return detailedVideos;
}

// Export to CSV
function exportToCSV(videos, outputPath) {
  const detailedVideos = videos.map(extractVideoDetails);

  // CSV headers
  const headers = [
    "Vimeo ID",
    "Title",
    "Description",
    "Duration (min)",
    "Embed URL",
    "Thumbnail URL",
    "Tags",
    "Categories",
    "Provincie",
    "Gemeente",
    "Organizations",
    "Views",
    "Created Date",
  ];

  // CSV rows
  const rows = detailedVideos.map((video) => [
    video.vimeoId,
    `"${video.title.replace(/"/g, '""')}"`, // Escape quotes
    `"${(video.description || "").substring(0, 200).replace(/"/g, '""')}"`, // Truncate and escape
    video.duration,
    video.embedUrl,
    video.thumbnail,
    `"${video.tags.join(", ")}"`,
    `"${video.categories.join(", ")}"`,
    video.provincie,
    video.gemeente,
    `"${video.organizations.join(", ")}"`,
    video.plays,
    video.createdAt,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  fs.writeFileSync(outputPath, csvContent, "utf8");

  console.log(`📊 Exported to CSV: ${outputPath}`);
}

// Main extraction function
async function extractAndExport() {
  try {
    console.log("=== Vimeo Video Data Extractor ===\n");

    // Create exports directory if it doesn't exist
    const exportsDir = path.join(__dirname, "../exports");
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    // Fetch all videos
    const vimeoVideos = await extractAllVimeoVideos();

    if (vimeoVideos.length === 0) {
      console.log("⚠️  No videos found in Vimeo account.");
      return;
    }

    // Generate filenames with timestamp
    const timestamp = new Date().toISOString().split("T")[0];
    const jsonPath = path.join(exportsDir, `vimeo_videos_${timestamp}.json`);
    const csvPath = path.join(exportsDir, `vimeo_videos_${timestamp}.csv`);

    // Export to both formats
    const detailedVideos = exportToJSON(vimeoVideos, jsonPath);
    exportToCSV(vimeoVideos, csvPath);

    // Print summary
    console.log("\n=== Extraction Summary ===");
    console.log(`Total videos: ${detailedVideos.length}`);
    console.log(`\nSample video:`);
    console.log(JSON.stringify(detailedVideos[0], null, 2));

    console.log("\n✨ Extraction complete!");
    console.log("\n📁 Files created:");
    console.log(`   - ${jsonPath}`);
    console.log(`   - ${csvPath}`);
    console.log("\n💡 Next steps:");
    console.log("   1. Review the exported files");
    console.log(
      "   2. Run 'node scripts/migrateVimeoVideos.js' to import to MongoDB"
    );
  } catch (error) {
    console.error("❌ Extraction failed:", error);
    process.exit(1);
  }
}

// Run the extraction
if (require.main === module) {
  extractAndExport();
}

module.exports = { extractAllVimeoVideos, extractVideoDetails };
