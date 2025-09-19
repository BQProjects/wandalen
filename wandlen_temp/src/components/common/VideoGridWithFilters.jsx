import React, { useContext, useState } from "react";
import OpkomendeZonIcon from "../../assets/opkomende-zon.svg";
import OndergaandeZonIcon from "../../assets/ondergaande-zon.svg";
import WinterIcon from "../../assets/winter.svg";
import SneeuwIcon from "../../assets/sneeuw.svg";
import VogelsIcon from "../../assets/vogels.svg";
import WildeDierenIcon from "../../assets/wildedieren.svg";
import KinderenIcon from "../../assets/kinderen.svg";
import KoeienIcon from "../../assets/koeien.svg";
import GoudenGrasIcon from "../../assets/gouden-gras.svg";
import RustigBriesjeIcon from "../../assets/rustigbriesje.svg";
import BosIcon from "../../assets/bos.svg";
import HeideIcon from "../../assets/heide.svg";
import RivierIcon from "../../assets/rivier.svg";
import WaterIcon from "../../assets/water.svg";
import ZomerIcon from "../../assets/zomer.svg";
import PlantIcon from "../../assets/plant.svg";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

// Helper function to get tag icon based on tag content
const getTagIcon = (tag) => {
  const lowerTag = tag.toLowerCase();

  // Sun/light related tags
  if (lowerTag.includes("opkomende zon") || lowerTag.includes("opkomende")) {
    return <img src={OpkomendeZonIcon} alt={tag} width={16} height={16} />;
  } else if (
    lowerTag.includes("ondergaande zon") ||
    lowerTag.includes("ondergaande")
  ) {
    return <img src={OndergaandeZonIcon} alt={tag} width={16} height={16} />;
  } else if (lowerTag.includes("zon")) {
    return <img src={OpkomendeZonIcon} alt={tag} width={16} height={16} />;
  }

  // Weather/season related tags
  else if (lowerTag.includes("winter")) {
    return <img src={WinterIcon} alt={tag} width={16} height={16} />;
  } else if (lowerTag.includes("sneeuw")) {
    return <img src={SneeuwIcon} alt={tag} width={16} height={16} />;
  } else if (lowerTag.includes("zomer")) {
    return <img src={ZomerIcon} alt={tag} width={16} height={16} />;
  } else if (
    lowerTag.includes("rustig briesje") ||
    lowerTag.includes("briesje")
  ) {
    return <img src={RustigBriesjeIcon} alt={tag} width={16} height={16} />;
  }

  // Animals
  else if (lowerTag.includes("vogels")) {
    return <img src={VogelsIcon} alt={tag} width={16} height={16} />;
  } else if (
    lowerTag.includes("wilde dieren") ||
    lowerTag.includes("wildedieren")
  ) {
    return <img src={WildeDierenIcon} alt={tag} width={16} height={16} />;
  } else if (lowerTag.includes("koeien")) {
    return <img src={KoeienIcon} alt={tag} width={16} height={16} />;
  } else if (lowerTag.includes("dieren")) {
    return <img src={WildeDierenIcon} alt={tag} width={16} height={16} />;
  }

  // People
  else if (lowerTag.includes("kinderen")) {
    return <img src={KinderenIcon} alt={tag} width={16} height={16} />;
  }

  // Nature/landscape
  else if (lowerTag.includes("gouden gras")) {
    return <img src={GoudenGrasIcon} alt={tag} width={16} height={16} />;
  } else if (lowerTag.includes("bos")) {
    return <img src={BosIcon} alt={tag} width={16} height={16} />;
  } else if (lowerTag.includes("heide")) {
    return <img src={HeideIcon} alt={tag} width={16} height={16} />;
  } else if (lowerTag.includes("rivier")) {
    return <img src={RivierIcon} alt={tag} width={16} height={16} />;
  } else if (lowerTag.includes("water")) {
    return <img src={WaterIcon} alt={tag} width={16} height={16} />;
  } else if (lowerTag.includes("plant")) {
    return <img src={PlantIcon} alt={tag} width={16} height={16} />;
  }

  // Default icon - using a simple circle SVG
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7" stroke="#381207" strokeWidth="2" />
    </svg>
  );
};

// Heart Icon Component
const HeartIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 17.5L8.75 16.375C4.25 12.375 1.25 9.75 1.25 6.875C1.25 4.625 2.875 3 5.125 3C6.625 3 8.0625 3.8125 8.75 4.9375C9.4375 3.8125 10.875 3 12.375 3C14.625 3 16.25 4.625 16.25 6.875C16.25 9.75 13.25 12.375 8.75 16.375L10 17.5Z"
      fill="#381207"
    />
  </svg>
);

// VideoCard Component
const VideoCard = ({
  title,
  duration,
  location,
  thumbnail,
  tags = [],
  views,
  likes,
  onSelect,
  showStats = true,
  isClientView = false,
  onEdit,
  onDelete,
  videoId,
}) => {
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");

  const handleDelete = async (videoId) => {
    try {
      const res = await axios.delete(
        `${DATABASE_URL}/volunteer/deleteVideo/${videoId}`,
        {
          headers: { Authorization: sessionId },
        }
      );
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={onSelect}
    >
      {/* Video Thumbnail */}
      <div className="relative">
        <video
          className="w-full h-48 object-cover"
          src={thumbnail}
          muted
          onMouseEnter={(e) => e.target.play()}
          onMouseLeave={(e) => e.target.pause()}
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {duration}
        </div>
        {isClientView && (
          <div className="absolute top-2 left-2 bg-[#dd9219] text-white px-2 py-1 rounded text-sm font-medium">
            NEW
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#381207] mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-[#381207] text-sm mb-3 opacity-75">{location}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-[#f8f5f0] rounded-full text-xs text-[#381207]"
            >
              {getTagIcon(tag)}
              <span>{tag}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        {showStats && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-[#381207] opacity-75">
              <span>{views} views</span>
              <div className="flex items-center gap-1">
                <HeartIcon />
                <span>{likes}</span>
              </div>
            </div>
            {/* Edit and Delete buttons for volunteers */}
            {!isClientView && onEdit && onDelete && (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(videoId);
                  }}
                  className="px-3 py-1 bg-[#dd9219] text-white text-xs rounded hover:bg-[#c47a15] transition-colors"
                  title="Edit video"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(videoId);
                    handleDelete(videoId);
                  }}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                  title="Delete video"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Filter Button Component
const FilterButton = ({
  label,
  onClick,
  isActive = false,
  options = [],
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  const handleOptionClick = (option) => {
    if (onOptionSelect) onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className={`flex items-center gap-5 pt-[0.6875rem] pb-[0.6875rem] px-5 h-[3.125rem] rounded-lg font-medium transition-all duration-200 ${
          isActive
            ? "bg-[#381207] text-[#ede4dc] shadow-lg"
            : "bg-[#f8f5f0] text-[#381207] hover:bg-[#e6d9cd] border border-[#d4c4b7]"
        }`}
      >
        <span
          className={`body font-['Poppins'] font-medium leading-[136%] ${
            isActive ? "text-[#ede4dc]" : "text-[#381207]"
          }`}
        >
          {label}
        </span>
        <svg
          width={13}
          height={8}
          viewBox="0 0 13 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.65556 7.38741L-0.00143814 1.73041L1.41256 0.316406L6.36256 5.26641L11.3126 0.316406L12.7266 1.73041L7.06956 7.38741C6.88203 7.57488 6.62773 7.68019 6.36256 7.68019C6.0974 7.68019 5.84309 7.57488 5.65556 7.38741Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && options.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-[19.5625rem] rounded-lg shadow-lg z-10 max-h-[14.375rem] overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="flex items-center py-2 px-5 h-[2.875rem] bg-[#381207] text-[#ede4dc] font-['Poppins'] font-medium leading-[136%] hover:bg-[#4a1b0f] cursor-pointer transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="mr-3" />
              <span className="flex-1">{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main VideoGridWithFilters Component
const VideoGridWithFilters = ({
  videos,
  onVideoSelect,
  title = "Recently Created by You",
  subtitle = "View, edit, and track the impact of your videos.",
  showFilters = true,
  showStats = true,
  isClientView = false,
  customFilterOptions = null,
  emptyStateMessage = "No videos match your current filters.",
  showResultsCount = true,
  onVideoEdit,
  onVideoDelete,
}) => {
  const [activeFilters, setActiveFilters] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  const defaultFilterOptions = {
    Lengte: [
      "0 - 15 minuten",
      "15 - 30 minuten",
      "30 - 45 minuten",
      "45 - 60 minuten",
      "+ 60 minuten",
    ],
    Locatie: ["Hellendoorn", "Lemele", "Lemelerveld", "Luttenberg", "Raalte"],
    Seizoen: ["Lente", "Zomer", "Herfst", "Winter"],
    Natuurtype: ["Bos", "Heide", "Park", "Strand", "Duinen"],
    Dieren: ["Vogels", "Koeien", "Paarden", "Schapen", "Eekhoorns"],
    Geluidsprikkels: ["Rustgevend", "Wind", "Water", "Vogels"],
  };

  const filterOptions = customFilterOptions || defaultFilterOptions;

  const handleFilterClick = (filter) => {
    setOpenDropdown(openDropdown === filter ? null : filter);
  };

  const handleOptionSelect = (filter, option) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filter]: prev[filter]?.includes(option)
        ? prev[filter].filter((item) => item !== option)
        : [...(prev[filter] || []), option],
    }));
    setOpenDropdown(null);
  };

  // Filtering functions
  const matchesDuration = (video, durationFilters) => {
    if (!durationFilters || durationFilters.length === 0) return true;
    const duration = parseInt(video.duration);
    return durationFilters.some((filter) => {
      switch (filter) {
        case "0 - 15 minuten":
          return duration <= 15;
        case "15 - 30 minuten":
          return duration > 15 && duration <= 30;
        case "30 - 45 minuten":
          return duration > 30 && duration <= 45;
        case "45 - 60 minuten":
          return duration > 45 && duration <= 60;
        case "+ 60 minuten":
          return duration > 60;
        default:
          return true;
      }
    });
  };

  const matchesLocation = (video, locationFilters) => {
    if (!locationFilters || locationFilters.length === 0) return true;
    return locationFilters.some((location) =>
      video.location.toLowerCase().includes(location.toLowerCase())
    );
  };

  const matchesSeason = (video, seasonFilters) => {
    if (!seasonFilters || seasonFilters.length === 0) return true;
    return seasonFilters.some((season) =>
      video.tags.some((tag) => tag.toLowerCase().includes(season.toLowerCase()))
    );
  };

  const matchesNatureType = (video, natureTypeFilters) => {
    if (!natureTypeFilters || natureTypeFilters.length === 0) return true;
    return natureTypeFilters.some(
      (nature) =>
        video.tags.some((tag) =>
          tag.toLowerCase().includes(nature.toLowerCase())
        ) || video.location.toLowerCase().includes(nature.toLowerCase())
    );
  };

  const matchesAnimals = (video, animalFilters) => {
    if (!animalFilters || animalFilters.length === 0) return true;
    return animalFilters.some((animal) =>
      video.tags.some((tag) => tag.toLowerCase().includes(animal.toLowerCase()))
    );
  };

  const matchesSound = (video, soundFilters) => {
    if (!soundFilters || soundFilters.length === 0) return true;
    return soundFilters.some((sound) =>
      video.tags.some(
        (tag) =>
          tag.toLowerCase().includes(sound.toLowerCase()) ||
          (sound === "Rustgevend" &&
            (tag.toLowerCase().includes("rustig") ||
              tag.toLowerCase().includes("briesje"))) ||
          (sound === "Water" && tag.toLowerCase().includes("rivier")) ||
          (sound === "Vogels" && tag.toLowerCase().includes("vogels"))
      )
    );
  };

  // Filter videos based on active filters
  const filteredVideos = videos.filter((video) => {
    return (
      matchesDuration(video, activeFilters.Lengte) &&
      matchesLocation(video, activeFilters.Locatie) &&
      matchesSeason(video, activeFilters.Seizoen) &&
      matchesNatureType(video, activeFilters.Natuurtype) &&
      matchesAnimals(video, activeFilters.Dieren) &&
      matchesSound(video, activeFilters.Geluidsprikkels)
    );
  });

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="text-[#dd9219] font-['Poppins'] text-2xl font-semibold leading-[136%] mb-2">
          {title}
        </div>
        <div className="text-[#381207] font-['Poppins'] text-5xl font-medium leading-[136%]">
          {subtitle}
        </div>
      </div>

      <div className="filtersysteem flex flex-col justify-end items-start pb-24 w-full">
        {/* Filters */}
        {showFilters && (
          <div className="filters flex flex-wrap items-center gap-4 mb-8">
            {Object.keys(filterOptions).map((filter) => (
              <FilterButton
                key={filter}
                label={filter}
                onClick={() => handleFilterClick(filter)}
                isActive={activeFilters[filter]?.length > 0}
                options={openDropdown === filter ? filterOptions[filter] : []}
                onOptionSelect={(option) => handleOptionSelect(filter, option)}
              />
            ))}
          </div>
        )}

        {/* Active filters display */}
        {Object.keys(activeFilters).some(
          (key) => activeFilters[key]?.length > 0
        ) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(activeFilters).map(([filter, options]) =>
              options?.map((option) => (
                <div
                  key={`${filter}-${option}`}
                  className="flex items-center gap-2 px-3 py-1 bg-[#381207] text-[#ede4dc] rounded-lg text-sm"
                >
                  <span>{option}</span>
                  <button
                    onClick={() => handleOptionSelect(filter, option)}
                    className="text-[#ede4dc] hover:text-[#dd9219]"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Results count */}
        {showResultsCount && (
          <div className="mb-4">
            <span className="text-[#381207] font-['Poppins'] text-sm">
              {filteredVideos.length} video
              {filteredVideos.length !== 1 ? "s" : ""} found
            </span>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                videoId={video._id}
                title={video.title}
                duration={video.duration}
                location={video.location}
                thumbnail={video.imgUrl}
                tags={video.tags || []}
                views={video.views || 320}
                likes={video.likes || 123}
                onSelect={() => onVideoSelect(video.id)}
                showStats={showStats}
                isClientView={isClientView}
                onEdit={onVideoEdit}
                onDelete={onVideoDelete}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-[#381207] font-['Poppins'] text-lg">
                {emptyStateMessage}
              </p>
              <button
                onClick={() => setActiveFilters({})}
                className="mt-4 px-4 py-2 bg-[#dd9219] text-white font-['Poppins'] rounded hover:bg-[#c47a15] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGridWithFilters;
