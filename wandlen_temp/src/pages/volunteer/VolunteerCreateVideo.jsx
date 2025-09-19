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

const VolunteerCreateVideo = () => {
  const { DATABASE_URL } = useContext(DatabaseContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { editMode = false, videoId = null } = location.state || {};
  const sessionId =
    localStorage.getItem("sessionId") || useContext(AuthContext)?.sessionId;

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    if (editMode) {
      const data1 = new FormData();
      data1.append("file", videoFile);
      data1.append("upload_preset", "wandelen"); // from Cloudinary
      data1.append("cloud_name", "dojwaepbj");

      const res1 = await fetch(
        "https://api.cloudinary.com/v1_1/dojwaepbj/auto/upload",
        {
          method: "POST",
          body: data1,
        }
      );

      const data2 = new FormData();
      data2.append("file", coverImage);
      data2.append("upload_preset", "wandelen"); // from Cloudinary
      data2.append("cloud_name", "dojwaepbj");

      const res2 = await fetch(
        "https://api.cloudinary.com/v1_1/dojwaepbj/auto/upload",
        {
          method: "POST",
          body: data2,
        }
      );

      const result1 = await res1.json();
      const result2 = await res2.json();

      console.log(result1, result2);
      const userId = localStorage.getItem("userId");

      const res = await axios.post(
        `${DATABASE_URL}/volunteer/editVideoInfo/${editMode}`,
        {
          title: formData.title,
          url: result2.secure_url,
          location: formData.location,
          description: formData.description,
          session: formData.session,
          nature: formData.natureType,
          sound: formData.soundStimuli,
          animals: formData.animals,
          tags: formData.tags,
          imgUrl: result1.secure_url,
          duration: formData.duration,
          id: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionId}`, // 👈 fix here
          },
        }
      );
    } else {
      // TODO: Integrate with backend API for creating video
      console.log("Creating video:", { ...formData, coverImage, videoFile });
      // Example: createVideo(formDataObj).then(() => navigate('/volunteer'));

      const data1 = new FormData();
      data1.append("file", videoFile);
      data1.append("upload_preset", "wandelen"); // from Cloudinary
      data1.append("cloud_name", "dojwaepbj");

      const res1 = await fetch(
        "https://api.cloudinary.com/v1_1/dojwaepbj/auto/upload",
        {
          method: "POST",
          body: data1,
        }
      );

      const data2 = new FormData();
      data2.append("file", coverImage);
      data2.append("upload_preset", "wandelen"); // from Cloudinary
      data2.append("cloud_name", "dojwaepbj");

      const res2 = await fetch(
        "https://api.cloudinary.com/v1_1/dojwaepbj/auto/upload",
        {
          method: "POST",
          body: data2,
        }
      );

      const result1 = await res1.json();
      const result2 = await res2.json();

      console.log(result1, result2);
      const userId = localStorage.getItem("userId");

      const res = await axios.post(
        `${DATABASE_URL}/volunteer/uploadVideos`,
        {
          title: formData.title,
          url: result2.secure_url,
          location: formData.location,
          description: formData.description,
          session: formData.session,
          nature: formData.natureType,
          sound: formData.soundStimuli,
          animals: formData.animals,
          tags: formData.tags,
          imgUrl: result1.secure_url,
          duration: formData.duration,
          id: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionId}`, // 👈 fix here
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        alert("Video uploaded successfully");
        navigate("/volunteer");
      } else {
        alert("Video upload failed");
      }
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
        location: res.data.location,
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
                  <option value="forest">Forest Sounds</option>
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
                className="px-6 py-2 font-[Poppins] bg-[#a6a643] text-white rounded-lg hover:bg-[#8b8b3a] transition font-medium"
              >
                {editMode ? "Update Video" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCreateVideo;
