import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadIcon from "../../assets/UploadIcon.svg";
import LinkIcon from "../../assets/LinkIcon.svg";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

// Helper function to get tag icon based on tag content
const getTagIcon = (tag) => {
  const lowerTag = tag.toLowerCase();

  // Sun/light related tags
  if (lowerTag.includes("opkomende zon") || lowerTag.includes("opkomende")) {
    return "☀️";
  } else if (
    lowerTag.includes("ondergaande zon") ||
    lowerTag.includes("ondergaande")
  ) {
    return "🌅";
  } else if (lowerTag.includes("zon")) {
    return "☀️";
  }

  // Weather/season related tags
  else if (lowerTag.includes("winter")) {
    return "❄️";
  } else if (lowerTag.includes("sneeuw")) {
    return "❄️";
  } else if (lowerTag.includes("zomer")) {
    return "☀️";
  } else if (
    lowerTag.includes("rustig briesje") ||
    lowerTag.includes("briesje")
  ) {
    return "🌬️";
  }

  // Animals
  else if (lowerTag.includes("vogels")) {
    return "🐦";
  } else if (
    lowerTag.includes("wilde dieren") ||
    lowerTag.includes("wildedieren")
  ) {
    return "🦌";
  } else if (lowerTag.includes("koeien")) {
    return "🐄";
  } else if (lowerTag.includes("dieren")) {
    return "🦌";
  }

  // People
  else if (lowerTag.includes("kinderen")) {
    return "👶";
  }

  // Nature/landscape
  else if (lowerTag.includes("gouden gras")) {
    return "🌾";
  } else if (lowerTag.includes("bos")) {
    return "🌲";
  } else if (lowerTag.includes("heide")) {
    return "🌿";
  } else if (lowerTag.includes("rivier")) {
    return "🏞️";
  } else if (lowerTag.includes("water")) {
    return "💧";
  } else if (lowerTag.includes("plant")) {
    return "🌱";
  }

  // Default icon
  return "🏷️";
};

const CreateVideo = () => {
  const { DATABASE_URL } = useContext(DatabaseContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { editMode = false, videoId = null } = location.state || {};
  const sessionId =
    localStorage.getItem("sessionId") || useContext(AuthContext)?.sessionId;

  // Municipality options based on selected province
  const getMunicipalityOptions = (selectedProvince) => {
    const municipalityData = {
      Drenthe: [
        "Aa en Hunze",
        "Assen",
        "Borger-Odoorn",
        "Coevorden",
        "De Wolden",
        "Emmen",
        "Hoogeveen",
        "Meppel",
        "Midden-Drenthe",
        "Noordenveld",
        "Tynaarlo",
        "Westerveld",
      ],
      Flevoland: [
        "Almere",
        "Dronten",
        "Lelystad",
        "Noordoostpolder",
        "Urk",
        "Zeewolde",
      ],
      Friesland: [
        "Achtkarspelen",
        "Ameland",
        "Dantumadiel",
        "De Fryske Marren",
        "Harlingen",
        "Heerenveen",
        "Leeuwarden",
        "Noardeast-Fryslân",
        "Ooststellingwerf",
        "Opsterland",
        "Schiermonnikoog",
        "Smallingerland",
        "Súdwest-Fryslân",
        "Terschelling",
        "Tytsjerksteradiel",
        "Vlieland",
        "Waadhoeke",
        "Weststellingwerf",
      ],
      Gelderland: [
        "Aalten",
        "Apeldoorn",
        "Arnhem",
        "Barneveld",
        "Berg en Dal",
        "Berkelland",
        "Beuningen",
        "Bronckhorst",
        "Brummen",
        "Buren",
        "Culemborg",
        "Doesburg",
        "Doetinchem",
        "Druten",
        "Duiven",
        "Ede",
        "Elburg",
        "Epe",
        "Ermelo",
        "Harderwijk",
        "Hattem",
        "Heerde",
        "Heumen",
        "Lingewaard",
        "Lochem",
        "Maasdriel",
        "Montferland",
        "Neder-Betuwe",
        "Nijkerk",
        "Nijmegen",
        "Nunspeet",
        "Oldebroek",
        "Oost Gelre",
        "Oude IJsselstreek",
        "Overbetuwe",
        "Putten",
        "Renkum",
        "Rheden",
        "Rozendaal",
        "Scherpenzeel",
        "Tiel",
        "Voorst",
        "Wageningen",
        "West Betuwe",
        "West Maas en Waal",
        "Westervoort",
        "Wijchen",
        "Winterswijk",
        "Zaltbommel",
        "Zevenaar",
        "Zutphen",
      ],
      Groningen: [
        "Eemsdelta",
        "Groningen",
        "Het Hogeland",
        "Midden-Groningen",
        "Pekela",
        "Stadskanaal",
        "Veendam",
        "Westerkwartier",
        "Westerwolde",
      ],
      Limburg: [
        "Beek",
        "Beekdaelen",
        "Beesel",
        "Bergen",
        "Brunssum",
        "Echt-Susteren",
        "Eijsden-Margraten",
        "Gennep",
        "Gulpen-Wittem",
        "Heerlen",
        "Horst aan de Maas",
        "Kerkrade",
        "Landgraaf",
        "Leudal",
        "Maasgouw",
        "Maastricht",
        "Meerssen",
        "Mook en Middelaar",
        "Nederweert",
        "Peel en Maas",
        "Roerdalen",
        "Roermond",
        "Sittard-Geleen",
        "Simpelveld",
        "Stein",
        "Vaals",
        "Valkenburg aan de Geul",
        "Venlo",
        "Venray",
        "Voerendaal",
        "Weert",
      ],
      "Noord-Brabant": [
        "Alphen-Chaam",
        "Altena",
        "Asten",
        "Baarle-Nassau",
        "Bergeijk",
        "Bergen op Zoom",
        "Bernheze",
        "Best",
        "Bladel",
        "Boekel",
        "Boxtel",
        "Breda",
        "Cranendonck",
        "Deurne",
        "Dongen",
        "Drimmelen",
        "Eersel",
        "Eindhoven",
        "Etten-Leur",
        "Geertruidenberg",
        "Geldrop-Mierlo",
        "Gemert-Bakel",
        "Gilze en Rijen",
        "Goirle",
        "Halderberge",
        "Heeze-Leende",
        "Helmond",
        "'s-Hertogenbosch",
        "Heusden",
        "Hilvarenbeek",
        "Laarbeek",
        "Land van Cuijk",
        "Loon op Zand",
        "Maashorst",
        "Meierijstad",
        "Moerdijk",
        "Nuenen, Gerwen en Nederwetten",
        "Oirschot",
        "Oisterwijk",
        "Oosterhout",
        "Oss",
        "Reusel-De Mierden",
        "Roosendaal",
        "Rucphen",
        "Sint-Michielsgestel",
        "Someren",
        "Son en Breugel",
        "Steenbergen",
        "Tilburg",
        "Valkenswaard",
        "Veldhoven",
        "Vught",
        "Waalre",
        "Waalwijk",
        "Woensdrecht",
        "Zundert",
      ],
      "Noord-Holland": [
        "Aalsmeer",
        "Alkmaar",
        "Amstelveen",
        "Amsterdam",
        "Beemster",
        "Bergen",
        "Beverwijk",
        "Blaricum",
        "Bloemendaal",
        "Bussum",
        "Castricum",
        "Den Helder",
        "Diemen",
        "Drechterland",
        "Edam-Volendam",
        "Enkhuizen",
        "Haarlem",
        "Haarlemmermeer",
        "Haarlemmerliede & Spaarnwoude",
        "Heemskerk",
        "Heemstede",
        "Heiloo",
        "Hollands Kroon",
        "Hoorn",
        "Huizen",
        "Koggenland",
        "Landsmeer",
        "Langedijk",
        "Laren",
        "Medemblik",
        "Opmeer",
        "Oostzaan",
        "Ouder-Amstel",
        "Purmerend",
        "Schagen",
        "Stede Broec",
        "Texel",
        "Uitgeest",
        "Uithoorn",
        "Velsen",
        "Waterland",
        "Zaanstad",
        "Zandvoort",
      ],
      Overijssel: [
        "Almelo",
        "Borne",
        "Dalfsen",
        "Deventer",
        "Dinkelland",
        "Enschede",
        "Haaksbergen",
        "Hardenberg",
        "Hellendoorn",
        "Hengelo",
        "Hof van Twente",
        "Kampen",
        "Losser",
        "Oldenzaal",
        "Olst-Wijhe",
        "Ommen",
        "Raalte",
        "Rijssen-Holten",
        "Staphorst",
        "Steenwijkerland",
        "Tubbergen",
        "Twenterand",
        "Wierden",
        "Zwartewaterland",
        "Zwolle",
      ],
      Utrecht: [
        "Amersfoort",
        "Baarn",
        "Bunnik",
        "Bunschoten",
        "De Bilt",
        "De Ronde Venen",
        "Eemnes",
        "Houten",
        "IJsselstein",
        "Leusden",
        "Lopik",
        "Montfoort",
        "Nieuwegein",
        "Oudewater",
        "Renswoude",
        "Rhenen",
        "Soest",
        "Stichtse Vecht",
        "Utrechse Heuvelrug",
        "Utrecht",
        "Veenendaal",
        "Vleuten-De Meern",
        "Woerden",
        "Woudenberg",
        "Zeist",
      ],
      Zeeland: [
        "Borsele",
        "Goes",
        "Hulst",
        "Kapelle",
        "Middelburg",
        "Noord-Beveland",
        "Reimerswaal",
        "Schouwen-Duiveland",
        "Sluis",
        "Terneuzen",
        "Tholen",
        "Veere",
        "Vlissingen",
      ],
      "Zuid-Holland": [
        "Alblasserdam",
        "Albrandswaard",
        "Alphen aan den Rijn",
        "Barendrecht",
        "Bodegraven-Reeuwijk",
        "Capelle aan den IJssel",
        "Delft",
        "Den Haag",
        "Dordrecht",
        "Goeree-Overflakkee",
        "Gorinchem",
        "Gouda",
        "Hardinxveld-Giessendam",
        "Hendrik-Ido-Ambacht",
        "Hillegom",
        "Hoeksche Waard",
        "Kaag en Braassem",
        "Katwijk",
        "Krimpen aan den IJssel",
        "Krimpenerwaard",
        "Lansingerland",
        "Leiden",
        "Leiderdorp",
        "Leidschendam-Voorburg",
        "Lisse",
        "Maassluis",
        "Midden-Delfland",
        "Molenlanden",
        "Nieuwkoop",
        "Nissewaard",
        "Noordwijk",
        "Oegstgeest",
        "Papendrecht",
        "Pijnacker-Nootdorp",
        "Ridderkerk",
        "Rijswijk",
        "Rotterdam",
        "Schiedam",
        "Sliedrecht",
        "Teylingen",
        "Vlaardingen",
        "Voorne aan Zee",
        "Voorschoten",
        "Waddinxveen",
        "Wassenaar",
        "Westland",
        "Zoetermeer",
        "Zoeterwoude",
        "Zuidplas",
        "Zwijndrecht",
      ],
    };
    return municipalityData[selectedProvince] || [];
  };

  // Predefined tags with their display names
  const predefinedTags = [
    "Opkomende zon",
    "Ondergaande zon",
    "Winter",
    "Sneeuw",
    "Zomer",
    "Rustig briesje",
    "Vogels",
    "Wilde dieren",
    "Kinderen",
    "Koeien",
    "Gouden gras",
    "Bos",
    "Heide",
    "Rivier",
    "Water",
    "Plant",
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    location: "",
    province: "",
    municipality: "",
    season: "",
    natureType: "",
    soundStimuli: "",
    animals: "",
    tags: [], // Changed to array
    imgUrl: "",
    url: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  // Handle tag selection
  const handleTagChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, tags: selectedOptions });
  };

  // Load video data if in edit mode
  useEffect(() => {
    if (editMode && videoId) {
      // TODO: In a real app, you would fetch video data from API
      // For now, we'll simulate loading data from the videos array used in VolunteerHome
      const mockVideoData = {
        1: {
          title: "Korte wandeling Holterberg",
          description: "A peaceful walk through the Holterberg forest",
          duration: "15 min",
          location: "Hellendoorn, Nederland",
          season: "Lente",
          natureType: "Bos",
          soundStimuli: "Vogels",
          animals: "Wilde dieren",
          tags: "Opkomende zon, Kinderen, Wilde dieren, Bos",
        },
        2: {
          title: "Boswandeling met vogels",
          description: "Forest walk with beautiful bird sounds",
          duration: "25 min",
          location: "Lemele, Nederland",
          season: "Winter",
          natureType: "Bos",
          soundStimuli: "Vogels",
          animals: "Vogels",
          tags: "Winter, Sneeuw, Gouden gras, Vogels, Bos",
        },
        // Add more mock data as needed
      };

      const videoData = mockVideoData[videoId];
      if (videoData) {
        setFormData({
          title: videoData.title,
          description: videoData.description,
          duration: videoData.duration,
          location: videoData.location,
          season: videoData.season,
          natureType: videoData.natureType,
          soundStimuli: videoData.soundStimuli,
          animals: videoData.animals,
          tags: videoData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
        });
      }
    }
  }, [editMode, videoId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      // Clear municipality when province changes
      if (name === "province") {
        newData.municipality = "";
      }
      return newData;
    });
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setShowUploadOptions(false); // Hide options once file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUploadProgress(0);
    setCurrentStep("Starting upload...");

    let videoUrl = formData.url; // Existing or new
    let imgUrl = formData.imgUrl; // Existing or new

    try {
      // Upload video file to Vimeo only if new
      if (videoFile) {
        setCurrentStep("Uploading video to Vimeo...");
        setUploadProgress(20);

        const videoFormData = new FormData();
        videoFormData.append("video", videoFile);
        videoFormData.append("title", formData.title || "Untitled Video");
        videoFormData.append("description", formData.description || "");

        const vimeoResponse = await axios.post(
          `${DATABASE_URL}/admin/upload-to-vimeo`,
          videoFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${sessionId}`,
            },
          }
        );

        if (vimeoResponse.status === 200) {
          videoUrl = vimeoResponse.data.videoUrl; // Vimeo embed URL
          console.log("Vimeo upload success:", vimeoResponse.data);
        } else {
          throw new Error("Video upload to Vimeo failed");
        }
        setUploadProgress(50);
      }

      // Upload cover image (keep using Cloudinary or your preferred service)
      if (coverImage) {
        setCurrentStep("Uploading cover image...");
        setUploadProgress(60);

        const data2 = new FormData();
        data2.append("file", coverImage);
        data2.append("upload_preset", "wandelen");
        data2.append("cloud_name", "dojwaepbj");

        const res2 = await fetch(
          "https://api.cloudinary.com/v1_1/dojwaepbj/auto/upload",
          {
            method: "POST",
            body: data2,
          }
        );
        const result2 = await res2.json();
        if (!res2.ok) throw new Error("Cover upload failed");
        imgUrl = result2.secure_url; // Cover URL
        setUploadProgress(80);
      }

      setCurrentStep(editMode ? "Updating video..." : "Creating video...");
      setUploadProgress(90);

      const payload = {
        title: formData.title,
        url: videoUrl, // Vimeo video URL
        location: formData.location,
        province: formData.province,
        municipality: formData.municipality,
        description: formData.description,
        season: formData.season,
        nature: formData.natureType,
        sound: formData.soundStimuli,
        animals: formData.animals,
        tags: formData.tags.join(", "), // Changed to string to match backend expectation
        imgUrl: imgUrl, // Cover URL
        duration: formData.duration,
      };

      if (editMode) {
        const res = await axios.put(
          `${DATABASE_URL}/volunteer/editVideoInfo/${videoId}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionId}`,
            },
          }
        );
        if (res.status === 200) {
          setUploadProgress(100);
          setCurrentStep("Video updated successfully!");
          setTimeout(() => {
            alert("Video updated successfully");
            navigate("/admin/all-videos");
          }, 1000);
        } else {
          throw new Error("Video update failed");
        }
      } else {
        const res = await axios.post(
          `${DATABASE_URL}/admin/uploadVideo`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionId}`,
            },
          }
        );
        if (res.status === 201) {
          setUploadProgress(100);
          setCurrentStep("Video created successfully!");
          setTimeout(() => {
            alert("Video uploaded successfully");
            navigate("/admin/all-videos");
          }, 1000);
        } else {
          throw new Error("Video upload failed");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setCurrentStep("Error occurred");
      alert(
        `An error occurred: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
      setCurrentStep("");
    }
  };

  const handleCancel = () => {
    if (editMode) {
      // If in edit mode, navigate back without clearing form
      navigate("/admin/manage-videos");
    } else {
      //clear form data
      setFormData({
        title: "",
        description: "",
        duration: "",
        location: "",
        season: "",
        natureType: "",
        soundStimuli: "",
        animals: "",
        tags: [], // Reset to empty array
      });
      setCoverImage(null);
      setVideoFile(null);
      setShowUploadOptions(false);
      navigate("/admin/manage-videos");
    }
  };

  const getVideoDetails = async () => {
    try {
      const res = await axios.get(
        `${DATABASE_URL}/admin/get-video/${videoId}`,
        { headers: { Authorization: `Bearer ${sessionId}` } }
      );
      setFormData({
        title: res.data.title,
        description: res.data.description,
        duration: res.data.duration,
        location: res.data.location,
        province: res.data.province || "",
        municipality: res.data.municipality || "",
        season: res.data.season,
        natureType: res.data.nature,
        soundStimuli: res.data.sound,
        animals: res.data.animals,
        tags: Array.isArray(res.data.tags)
          ? res.data.tags
          : res.data.tags
          ? res.data.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0)
          : [],
        imgUrl: res.data.imgUrl,
        url: res.data.url,
      });
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  useEffect(() => {
    if (editMode) {
      getVideoDetails();
    }
  }, [editMode]);

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#a6a643]"></div>
              </div>
              <h3 className="text-lg font-medium text-[#381207] mb-2">
                {editMode ? "Updating Video" : "Creating Video"}
              </h3>
              <p className="text-sm text-[#7a756e] mb-4">{currentStep}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#a6a643] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-[#7a756e] mt-2">{uploadProgress}%</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-medium text-[#381207] font-[Poppins] text-center mb-8">
          {editMode ? "Edit Video" : "Create Video"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Cover Page Upload */}
          <div className="bg-[#f7f6f4] rounded-2xl p-6">
            <h2 className="text-lg font-medium font-[Poppins] text-[#381207] mb-4">
              Cover page
            </h2>
            <div className="border-2 border-dashed border-[#e5e3df] rounded-lg p-8 h-64 flex flex-col items-center justify-center bg-[#f7f6f4]">
              {coverImage ? (
                <div className="text-center">
                  <img
                    src={
                      editMode
                        ? formData.imgUrl
                        : URL.createObjectURL(coverImage)
                    }
                    alt="Cover preview"
                    className="max-w-full font-[Poppins] max-h-32 mx-auto mb-4 rounded"
                  />
                  <p className="text-[#381207] font-[Poppins] text-sm">
                    {coverImage.name}
                  </p>
                  <button
                    onClick={() => setCoverImage(null)}
                    className="mt-2 text-red-500 font-[Poppins] text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="cursor-pointer font-[Poppins] bg-[#a6a643] text-white px-4 py-2 rounded-lg hover:bg-[#8b8b3a] transition font-medium"
                  >
                    Upload Image
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Video Upload */}
          <div className="bg-[#f7f6f4] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium font-[Poppins] text-[#381207]">
                Video
              </h2>
            </div>
            <div className="border-2 border-dashed border-[#e5e3df] rounded-lg p-8 h-64 flex flex-col items-center justify-center bg-[#f7f6f4]">
              {videoFile ? (
                <div className="text-center">
                  <svg
                    width={48}
                    height={48}
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mx-auto mb-4 text-[#a6a643]"
                  >
                    <path
                      d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h1.586a1 1 0 0 1 .707.293l.707.707A1 1 0 0 0 12.414 11H15m-3-3h1.586a1 1 0 0 1 .707.293l.707.707A1 1 0 0 0 15.414 9H18m-3-3h1.586a1 1 0 0 1 .707.293l.707.707A1 1 0 0 0 17.414 7H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-[#381207] text-sm font-[Poppins]">
                    {videoFile.name}
                  </p>
                  <button
                    onClick={() => {
                      setVideoFile(null);
                      setShowUploadOptions(false);
                    }}
                    className="mt-2 text-red-500 text-sm font-[Poppins] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  {!showUploadOptions ? (
                    <button
                      onClick={() => setShowUploadOptions(true)}
                      className="cursor-pointer font-[Poppins] bg-[#a6a643] text-white px-4 py-2 rounded-lg hover:bg-[#8b8b3a] transition font-medium mb-4"
                    >
                      Upload Video
                    </button>
                  ) : (
                    <>
                      <label
                        htmlFor="video-upload"
                        className="cursor-pointer font-[Poppins] bg-[#a6a643] text-white px-4 py-2 rounded-lg hover:bg-[#8b8b3a] transition font-medium mb-4 block"
                      >
                        Choose File
                      </label>

                      {/* Upload Options */}
                      <div className="bg-[#ede4dc] rounded-lg p-2 shadow-sm">
                        <div
                          className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100"
                          onClick={() =>
                            document.getElementById("video-upload").click()
                          }
                        >
                          <img src={UploadIcon} alt="Upload Icon" />
                          <span className="text-[#4b4741] font-[Poppins] text-sm">
                            Upload from computer
                          </span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100">
                          <img src={LinkIcon} alt="Link Icon" />
                          <span className="text-[#381207] font-[Poppins] text-sm font-medium">
                            Add link
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video Info Form */}
        <div className="bg-[#f7f6f4] rounded-2xl p-8">
          <h2 className="text-lg font-medium font-[Poppins] text-[#381207] mb-6">
            Video Info
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-[#381207] font-[Poppins] font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                placeholder="Enter a clear and concise title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#381207] font-[Poppins] font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                placeholder="What's this video about? Share key highlights or purpose..."
              />
            </div>

            {/* Duration and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#381207] font-[Poppins] font-medium mb-2">
                  Video duration
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">-Select an option-</option>
                  <option value="short">Short (0-5 min)</option>
                  <option value="medium">Medium (5-15 min)</option>
                  <option value="long">Long (15+ min)</option>
                </select>
              </div>
              <div>
                <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">-Select an option-</option>
                  <option value="forest">Forest</option>
                  <option value="beach">Beach</option>
                  <option value="mountain">Mountain</option>
                  <option value="park">Park</option>
                  <option value="garden">Garden</option>
                </select>
              </div>
            </div>

            {/* Province and Municipality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                  Province
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">-Select an option-</option>
                  <option value="Drenthe">Drenthe</option>
                  <option value="Flevoland">Flevoland</option>
                  <option value="Friesland">Friesland</option>
                  <option value="Gelderland">Gelderland</option>
                  <option value="Groningen">Groningen</option>
                  <option value="Limburg">Limburg</option>
                  <option value="Noord-Brabant">Noord-Brabant</option>
                  <option value="Noord-Holland">Noord-Holland</option>
                  <option value="Overijssel">Overijssel</option>
                  <option value="Utrecht">Utrecht</option>
                  <option value="Zeeland">Zeeland</option>
                  <option value="Zuid-Holland">Zuid-Holland</option>
                </select>
              </div>
              <div>
                <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                  Municipality
                </label>
                <select
                  name="municipality"
                  value={formData.municipality}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                  disabled={!formData.province}
                >
                  <option value="">
                    {formData.province
                      ? "-Select an option-"
                      : "Select Province First"}
                  </option>
                  {/* Municipality options will be populated based on selected province */}
                  {formData.province &&
                    getMunicipalityOptions(formData.province).map(
                      (municipality) => (
                        <option key={municipality} value={municipality}>
                          {municipality}
                        </option>
                      )
                    )}
                </select>
              </div>
            </div>

            {/* Season and Nature Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                  Season
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">-Select an option-</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="autumn">Autumn</option>
                  <option value="winter">Winter</option>
                </select>
              </div>
              <div>
                <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                  Nature Type
                </label>
                <select
                  name="natureType"
                  value={formData.natureType}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">-Select an option-</option>
                  <option value="woodland">Woodland</option>
                  <option value="wetland">Wetland</option>
                  <option value="grassland">Grassland</option>
                  <option value="aquatic">Aquatic</option>
                  <option value="meer">Meer</option>
                  <option value="weide">Weide</option>
                  <option value="moeras">Moeras</option>
                </select>
              </div>
            </div>

            {/* Sound Stimuli and Animals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                  Sound Stimuli
                </label>
                <select
                  name="soundStimuli"
                  value={formData.soundStimuli}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">-Select an option-</option>
                  <option value="birds">Birds</option>
                  <option value="water">Water</option>
                  <option value="wind">Wind</option>
                  <option value="forest sounds">Forest Sounds</option>
                </select>
              </div>
              <div>
                <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                  Animals
                </label>
                <select
                  name="animals"
                  value={formData.animals}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">-Select an option-</option>
                  <option value="birds">Birds</option>
                  <option value="mammals">Mammals</option>
                  <option value="insects">Insects</option>
                  <option value="fish">Fish</option>
                  <option value="konijnen/hazen">Konijnen/Hazen</option>
                  <option value="herten">Herten</option>
                  <option value="krekels">Krekels</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                Tags
              </label>
              <select
                multiple
                value={formData.tags}
                onChange={handleTagChange}
                className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] min-h-[120px]"
              >
                {predefinedTags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {getTagIcon(tag)} {tag}
                  </option>
                ))}
              </select>
              <p className="text-sm text-[#7a756e] mt-1 font-[Poppins]">
                Hold Ctrl (Cmd on Mac) to select multiple tags
              </p>
              {formData.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#f0f0f0] text-[#381207] text-sm rounded-full"
                    >
                      {getTagIcon(tag)} {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-[#e5e3df] font-[Poppins] text-[#4b4741] rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 font-[Poppins] rounded-lg transition font-medium ${
                  isLoading
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-[#a6a643] text-white hover:bg-[#8b8b3a]"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {editMode ? "Updating..." : "Creating..."}
                  </div>
                ) : editMode ? (
                  "Update Video"
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
