import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UploadIcon from "../../assets/UploadIcon.svg";
import LinkIcon from "../../assets/LinkIcon.svg";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

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

// Helper function to format bytes
const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const VolunteerCreateVideo = () => {
  const { DATABASE_URL } = useContext(DatabaseContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    editMode = false,
    videoId = null,
    requestData = null,
  } = location.state || {};
  const sessionId =
    localStorage.getItem("sessionId") || useContext(AuthContext)?.sessionId;
  const { t } = useTranslation();

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
    province: "",
    municipality: "",
    season: "",
    natureType: "",
    soundStimuli: "",
    animals: "",
    tags: [], // Changed to array
    customTags: "", // New field for extra tags
    imgUrl: "",
    url: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [uploadStats, setUploadStats] = useState({
    uploadedSize: 0,
    totalSize: 0,
    startTime: Date.now(),
    estimatedTime: 0,
  });

  // Cleanup video preview URL on unmount or video change
  useEffect(() => {
    if (videoFile && videoFile.type !== "link") {
      const url = URL.createObjectURL(videoFile);
      setVideoPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setVideoPreviewUrl(null);
      };
    }
  }, [videoFile]);

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

  // Pre-fill form with request data if available
  useEffect(() => {
    if (requestData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: requestData.location || prevFormData.location,
      }));
    }
  }, [requestData]);

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

  const handleAddLink = () => {
    setShowLinkModal(true);
  };

  const handleLinkSubmit = () => {
    if (linkInput.trim()) {
      // Store the link in formData
      setFormData({ ...formData, url: linkInput.trim() });
      // Create a mock file object to show that a video source exists
      setVideoFile({ name: "Google Drive Video", type: "link" });
      setShowLinkModal(false);
      setLinkInput("");
      setShowUploadOptions(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUploadProgress(0);
    setCurrentStep("Starting upload...");
    setUploadStats({
      uploadedSize: 0,
      totalSize: 0,
      startTime: Date.now(),
      estimatedTime: 0,
    });

    let videoUrl = formData.url; // Existing or new
    let imgUrl = formData.imgUrl; // Existing or new

    try {
      // Upload video file to Vimeo only if it's an actual file (not a link)
      if (videoFile && videoFile.type !== "link") {
        setCurrentStep(t("volunteerCreateVideo.uploadingVideo"));

        // Step 1: Get upload ticket from backend
        const ticketResponse = await axios.post(
          `${DATABASE_URL}/volunteer/get-vimeo-upload-ticket`,
          {
            title: formData.title || "Untitled Video",
            description: formData.description || "",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionId}`,
            },
          }
        );

        if (
          !ticketResponse.data.ticket ||
          !ticketResponse.data.ticket.upload_link
        ) {
          throw new Error("Failed to get Vimeo upload ticket");
        }

        const { upload_link, uri } = ticketResponse.data.ticket;
        const videoId = uri.split("/").pop(); // Extract video ID from URI

        // Step 2: Upload directly to Vimeo using XMLHttpRequest
        await new Promise((resolveUpload, rejectUpload) => {
          const xhr = new XMLHttpRequest();

          xhr.open("POST", upload_link, true);
          xhr.timeout = 30 * 60 * 1000; // 30 minutes

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentCompleted = Math.round(
                (event.loaded * 100) / event.total
              );
              setUploadProgress(percentCompleted);

              // Calculate real-time speed and ETA
              const currentTime = Date.now();
              const timeDiff = (currentTime - uploadStats.startTime) / 1000;
              const bytesDiff = event.loaded - (uploadStats.uploadedSize || 0);
              const instantSpeed = timeDiff > 0 ? bytesDiff / timeDiff : 0;

              const remainingBytes = event.total - event.loaded;
              const estimatedTime =
                instantSpeed > 0 ? remainingBytes / instantSpeed : 0;

              setUploadStats({
                uploadedSize: event.loaded,
                totalSize: event.total,
                startTime: uploadStats.startTime,
                estimatedTime: estimatedTime,
                currentSpeed: instantSpeed,
              });

              setCurrentStep("Uploading to Vimeo...");
            }
          };

          xhr.onload = async () => {
            if (xhr.status === 201 || xhr.status === 200) {
              try {
                // Step 3: Get video details from backend
                const videoDetailsResponse = await axios.get(
                  `${DATABASE_URL}/volunteer/get-vimeo-video-details/${videoId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${sessionId}`,
                    },
                  }
                );

                if (videoDetailsResponse.data.embedUrl) {
                  videoUrl = videoDetailsResponse.data.embedUrl;

                  // Upload thumbnail if exists
                  if (coverImage) {
                    setCurrentStep(t("volunteerCreateVideo.uploadingCover"));
                    const thumbnailFormData = new FormData();
                    thumbnailFormData.append("thumbnail", coverImage);
                    thumbnailFormData.append("videoId", videoId);

                    try {
                      const thumbnailResponse = await axios.post(
                        `${DATABASE_URL}/volunteer/upload-thumbnail-to-vimeo`,
                        thumbnailFormData,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${sessionId}`,
                          },
                        }
                      );

                      if (thumbnailResponse.status === 200) {
                        imgUrl = thumbnailResponse.data.thumbnailUrl;
                      }
                    } catch (error) {
                      console.error("Thumbnail upload failed:", error);
                    }
                  }

                  resolveUpload();
                } else {
                  rejectUpload(new Error("Failed to get video details"));
                }
              } catch (error) {
                rejectUpload(error);
              }
            } else {
              rejectUpload(
                new Error(`Upload failed with status ${xhr.status}`)
              );
            }
          };

          xhr.onerror = () => {
            rejectUpload(new Error("Network error during upload"));
          };

          const formDataUpload = new FormData();
          formDataUpload.append("file_data", videoFile);

          xhr.send(formDataUpload);
        });
      } else if (coverImage && !videoFile && editMode) {
        // If only updating thumbnail in edit mode
        setCurrentStep(t("volunteerCreateVideo.uploadingCover"));
        setUploadProgress(10);

        // Extract video ID from existing URL if available
        const videoIdMatch = formData.url?.match(/vimeo\.com\/video\/(\d+)/);
        if (videoIdMatch) {
          const vimeoVideoId = videoIdMatch[1];

          const thumbnailFormData = new FormData();
          thumbnailFormData.append("thumbnail", coverImage);
          thumbnailFormData.append("videoId", vimeoVideoId);

          try {
            const thumbnailResponse = await axios.post(
              `${DATABASE_URL}/volunteer/upload-thumbnail-to-vimeo`,
              thumbnailFormData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${sessionId}`,
                },
                onUploadProgress: (progressEvent) => {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  setUploadProgress(10 + Math.round(percentCompleted * 0.8)); // 10-90% for thumbnail
                  setCurrentStep(
                    `${t(
                      "volunteerCreateVideo.uploadingCover"
                    )} (${percentCompleted}%)`
                  );
                },
              }
            );

            if (thumbnailResponse.status === 200) {
              imgUrl = thumbnailResponse.data.thumbnailUrl;
              console.log(
                "Vimeo thumbnail upload success:",
                thumbnailResponse.data
              );
            }
          } catch (thumbnailError) {
            console.error("Thumbnail upload failed:", thumbnailError);
          }
        }
        setUploadProgress(80);
      }

      setCurrentStep(
        editMode
          ? t("volunteerCreateVideo.updatingVideo")
          : t("volunteerCreateVideo.creatingVideo")
      );
      setUploadProgress(95);

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
        tags: formData.tags,
        customTags: formData.customTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        imgUrl: imgUrl, // Cover URL
        duration: formData.duration,
        id: localStorage.getItem("userId"),
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
          setCurrentStep(t("volunteerCreateVideo.videoUpdatedSuccess"));
          setTimeout(() => {
            toast.success(t("volunteerCreateVideo.videoUpdatedSuccess"));
            navigate("/volunteer");
          }, 1000);
        } else {
          throw new Error(t("volunteerCreateVideo.videoUpdateFailed"));
        }
      } else {
        const res = await axios.post(
          `${DATABASE_URL}/volunteer/uploadVideos`,
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
          setCurrentStep(t("volunteerCreateVideo.videoUploadedSuccess"));

          // Update request status to completed if this was created from a request
          if (requestData && requestData._id) {
            try {
              await axios.put(
                `${DATABASE_URL}/volunteer/updateRequestStatus/${requestData._id}`,
                {
                  status: "Completed",
                  volunteerId: localStorage.getItem("userId"),
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionId}`,
                  },
                }
              );
            } catch (statusUpdateError) {
              console.error(
                "Failed to update request status:",
                statusUpdateError
              );
            }
          }

          setTimeout(() => {
            toast.success(t("volunteerCreateVideo.videoUploadedSuccess"));
            navigate("/volunteer");
          }, 1000);
        } else {
          throw new Error(t("volunteerCreateVideo.videoUploadFailed"));
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setCurrentStep(t("volunteerCreateVideo.errorOccurred"));
      toast.error(
        `${t("volunteerCreateVideo.errorOccurred")}: ${
          error.response?.data?.message || error.message
        }`
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
      navigate("/volunteer");
    } else {
      //clear form data
      setFormData({
        title: "",
        description: "",
        duration: "",
        season: "",
        natureType: "",
        soundStimuli: "",
        animals: "",
        tags: [], // Reset to empty array
        customTags: "",
      });
      setCoverImage(null);
      setVideoFile(null);
      setShowUploadOptions(false);
      navigate("/volunteer");
    }
  };

  const getVideoDetails = async () => {
    try {
      const res = await axios.get(
        `${DATABASE_URL}/volunteer/getVideo/${videoId}`,
        { headers: { Authorization: `Bearer ${sessionId}` } }
      );
      setFormData({
        title: res.data.title,
        description: res.data.description,
        duration: res.data.duration,
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
        customTags: Array.isArray(res.data.customTags) ? res.data.customTags.join(', ') : res.data.customTags || '',
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
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-[#a6a643] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs font-medium text-[#381207] mb-1">
                {uploadProgress}%
              </p>

              {/* Upload Stats */}
              {uploadStats.totalSize > 0 && (
                <div className="mt-4 space-y-2 text-sm text-[#7a756e]">
                  <div className="flex justify-between items-center">
                    <span>Uploaded:</span>
                    <span className="font-medium text-[#381207]">
                      {formatBytes(uploadStats.uploadedSize)} /{" "}
                      {formatBytes(uploadStats.totalSize)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-medium text-[#381207] font-[Poppins] text-center mb-8">
          {editMode
            ? t("volunteerCreateVideo.editPageTitle")
            : t("volunteerCreateVideo.pageTitle")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Cover Page Upload */}
          <div className="bg-[#f7f6f4] rounded-2xl p-6">
            <h2 className="text-lg font-medium font-[Poppins] text-[#381207] mb-4">
              {t("volunteerCreateVideo.coverPage")}
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
                    {t("volunteerCreateVideo.remove")}
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
                    {t("volunteerCreateVideo.uploadImage")}
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Video Upload */}
          <div className="bg-[#f7f6f4] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium font-[Poppins] text-[#381207]">
                {t("volunteerCreateVideo.video")}
              </h2>
            </div>
            <div className="border-2 border-dashed border-[#e5e3df] rounded-lg p-8 h-64 flex flex-col items-center justify-center bg-[#f7f6f4]">
              {/* Show existing video URL in edit mode if no new video is selected */}
              {editMode && !videoFile && !showUploadOptions && formData.url ? (
                <div className="text-center w-full">
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <svg
                        className="w-5 h-5 text-[#2a341f]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="text-[#381207] font-medium font-[Poppins]">
                        Current Video URL
                      </span>
                    </div>
                    <p className="text-[#7a756e] text-sm break-all mb-4 font-[Poppins] px-4">
                      {formData.url}
                    </p>
                    <a
                      href={formData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#2a341f] text-white rounded-lg hover:bg-[#1e241a] transition font-[Poppins] text-sm mb-3"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download/View Video
                    </a>
                  </div>
                  <button
                    onClick={() => setShowUploadOptions(true)}
                    className="cursor-pointer font-[Poppins] bg-[#a6a643] text-white px-4 py-2 rounded-lg hover:bg-[#8b8b3a] transition font-medium"
                  >
                    Upload New Video
                  </button>
                </div>
              ) : videoFile ? (
                <div className="text-center w-full">
                  {videoFile.type === "link" ? (
                    // Show Google Drive link
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <svg
                            className="w-5 h-5 text-[#2a341f]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          <span className="text-[#381207] font-medium font-[Poppins]">
                            Video Link Added
                          </span>
                        </div>
                        <p className="text-[#7a756e] text-sm break-all mb-3 font-[Poppins] px-4">
                          {formData.url}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setVideoFile(null);
                          setFormData({ ...formData, url: "" });
                          setShowUploadOptions(false);
                        }}
                        className="mt-2 text-red-500 text-sm font-[Poppins] hover:underline"
                      >
                        {t("volunteerCreateVideo.remove")}
                      </button>
                    </div>
                  ) : (
                    // Show video preview for uploaded files
                    <>
                      <video
                        src={videoPreviewUrl}
                        controls
                        className="w-full max-h-40 mx-auto mb-4 rounded object-contain"
                      >
                        Your browser does not support the video tag.
                      </video>
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
                        {t("volunteerCreateVideo.remove")}
                      </button>
                    </>
                  )}
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
                      {t("volunteerCreateVideo.uploadVideo")}
                    </button>
                  ) : (
                    <>
                      <label
                        htmlFor="video-upload"
                        className="cursor-pointer font-[Poppins] bg-[#a6a643] text-white px-4 py-2 rounded-lg hover:bg-[#8b8b3a] transition font-medium mb-4 block"
                      >
                        {t("volunteerCreateVideo.chooseFile")}
                      </label>

                      {/* Upload Options */}
                      <div className="bg-[#ede4dc] rounded-lg p-2 shadow-sm mb-4">
                        <div
                          className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100"
                          onClick={() =>
                            document.getElementById("video-upload").click()
                          }
                        >
                          <img src={UploadIcon} alt="Upload Icon" />
                          <span className="text-[#4b4741] font-[Poppins] text-sm">
                            {t("volunteerCreateVideo.uploadFromComputer")}
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100"
                          onClick={handleAddLink}
                        >
                          <img src={LinkIcon} alt="Link Icon" />
                          <span className="text-[#4b4741] font-[Poppins] text-sm font-medium">
                            Add link
                          </span>
                        </div>
                      </div>

                      {/* Back button to view current video in edit mode */}
                      {editMode && formData.url && (
                        <button
                          onClick={() => setShowUploadOptions(false)}
                          className="text-[#7a756e] text-sm font-[Poppins] hover:text-[#381207] transition"
                        >
                          ← Back to Current Video
                        </button>
                      )}
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
            {t("volunteerCreateVideo.videoInfo")}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-[#381207] font-[Poppins] font-medium mb-2">
                {t("volunteerCreateVideo.titleRequired")}
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                placeholder={t("volunteerCreateVideo.titlePlaceholder")}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#381207] font-[Poppins] font-medium mb-2">
                {t("volunteerCreateVideo.description")}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                placeholder={t("volunteerCreateVideo.descriptionPlaceholder")}
              />
            </div>

            {/* Video Duration */}
            <div>
              <label className="block text-[#381207] font-[Poppins] font-medium mb-2">
                {t("volunteerCreateVideo.videoDuration")}
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  // Only allow numbers, backspace, delete, tab, escape, enter, and arrow keys
                  if (
                    !/[0-9]/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "Tab",
                      "Escape",
                      "Enter",
                      "ArrowLeft",
                      "ArrowRight",
                      "ArrowUp",
                      "ArrowDown",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                min="0"
                className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                placeholder={t("volunteerCreateVideo.durationPlaceholder")}
              />
            </div>

            {/* Province and Municipality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                  {t("volunteerCreateVideo.province")}
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">
                    {t("volunteerCreateVideo.provincePlaceholder")}
                  </option>
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
                  {t("volunteerCreateVideo.municipality")}
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
                      ? t("volunteerCreateVideo.selectOption")
                      : t("volunteerCreateVideo.municipalityPlaceholder")}
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
                  {t("volunteerCreateVideo.season")}
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">
                    {t("volunteerCreateVideo.selectOption")}
                  </option>
                  <option value="spring">
                    {t("volunteerCreateVideo.seasonSpring")}
                  </option>
                  <option value="summer">
                    {t("volunteerCreateVideo.seasonSummer")}
                  </option>
                  <option value="autumn">
                    {t("volunteerCreateVideo.seasonAutumn")}
                  </option>
                  <option value="winter">
                    {t("volunteerCreateVideo.seasonWinter")}
                  </option>
                </select>
              </div>
              <div>
                <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                  {t("volunteerCreateVideo.natureType")}
                </label>
                <select
                  name="natureType"
                  value={formData.natureType}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">
                    {t("volunteerCreateVideo.selectOption")}
                  </option>
                  <option value="Bos">Bos</option>
                  <option value="Heide">Heide</option>
                  <option value="Duinen">Duinen</option>
                  <option value="Grasland / weiland">Grasland / weiland</option>
                  <option value="Water, moeras, rivier & meren">
                    Water, moeras, rivier & meren
                  </option>
                  <option value="Stadsgroen & park">Stadsgroen & park</option>
                </select>
              </div>
            </div>

            {/* Sound Stimuli and Animals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <div>
                <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                  Sound Stimuli
                </label>
                <select
                  name="soundStimuli"
                  value={formData.soundStimuli}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">Select Option</option>
                  <option value="birds">Birds</option>
                  <option value="water">Water</option>
                  <option value="wind">Wind</option>
                  <option value="forest sounds">Forest Sounds</option>
                </select>
              </div> */}
              <div>
                <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                  {t("volunteerCreateVideo.animals")}
                </label>
                <select
                  name="animals"
                  value={formData.animals}
                  onChange={handleInputChange}
                  className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f] appearance-none"
                >
                  <option value="">
                    {t("volunteerCreateVideo.selectOption")}
                  </option>
                  <option value="Vogels">Vogels</option>
                  <option value="Eenden">Eenden</option>
                  <option value="Reeen">Reeen</option>
                  <option value="Konijnen/hazen">Konijnen/hazen</option>
                  <option value="Egels">Egels</option>
                  <option value="Schapen">Schapen</option>
                  <option value="Koeien">Koeien</option>
                  <option value="Reptielen">Reptielen</option>
                  <option value="Kikkers">Kikkers</option>
                  <option value="Insecten">Insecten</option>
                  <option value="Vlinders">Vlinders</option>
                  <option value="Bijen">Bijen</option>
                  <option value="Libellen">Libellen</option>
                  <option value="Zwanen">Zwanen</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                {t("volunteerCreateVideo.tags")}
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
                {t("volunteerCreateVideo.tagsHelp")}
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

            {/* Extra Tags */}
            <div>
              <label className="block font-[Poppins] text-[#381207] font-medium mb-2">
                Extra tags
              </label>
              <input
                type="text"
                name="customTags"
                value={formData.customTags}
                onChange={handleInputChange}
                className="w-full p-3 border font-[Poppins] border-[#b3b1ac] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                placeholder="Voer extra tags in, gescheiden door komma's"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-[#e5e3df] font-[Poppins] text-[#4b4741] rounded-lg hover:bg-gray-300 transition font-medium"
              >
                {t("volunteerCreateVideo.cancel")}
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
                    {editMode
                      ? t("volunteerCreateVideo.updating")
                      : t("volunteerCreateVideo.creating")}
                  </div>
                ) : editMode ? (
                  t("volunteerCreateVideo.updateVideo")
                ) : (
                  t("volunteerCreateVideo.submit")
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Link Input Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-medium text-[#381207] mb-4 font-[Poppins]">
              Add Video Link
            </h3>
            <p className="text-[#7a756e] text-sm mb-4 font-[Poppins]">
              Paste your link here. Make sure the link is publicly accessible.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-[#381207] font-medium mb-2 font-[Poppins]">
                  Video Link
                </label>
                <input
                  type="url"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="https://your-link-here.com"
                  className="w-full p-3 border border-[#b3b1ac] font-[Poppins] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkInput("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-[Poppins]"
              >
                {t("volunteerCreateVideo.cancel")}
              </button>
              <button
                onClick={handleLinkSubmit}
                disabled={!linkInput.trim()}
                className={`flex-1 px-4 py-2 rounded-lg transition font-[Poppins] ${
                  linkInput.trim()
                    ? "bg-[#2a341f] text-white hover:bg-[#1e241a]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerCreateVideo;
