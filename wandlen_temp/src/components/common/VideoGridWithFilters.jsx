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
  uploadedBy,
  isAdminView = false,
  isApproved = false,
}) => {
  const { DATABASE_URL } = useContext(DatabaseContext);
  const sessionId = localStorage.getItem("sessionId");
  const currentUserId = localStorage.getItem("userId");

  // Check if current user is the uploader or if this is admin view
  const uploaderId =
    typeof uploadedBy === "object"
      ? uploadedBy?._id || uploadedBy?.id
      : uploadedBy;
  const isUploader = uploaderId === currentUserId;
  const canEdit = isAdminView || isUploader;

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={onSelect}
    >
      {/* Video Thumbnail */}
      <div className="relative">
        <img className="w-full h-48 object-cover" src={thumbnail} alt={title} />
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {duration ? `${duration} min` : "N/A"}{" "}
        </div>
        {isClientView && (
          <div className="absolute top-2 left-2 bg-[#dd9219] text-white px-2 py-1 rounded text-sm font-medium">
            NEW
          </div>
        )}
        {isAdminView && (
          <div
            className={`absolute top-2 left-2 px-2 py-1 rounded text-sm font-medium ${
              isApproved ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {isApproved ? "APPROVED" : "PENDING"}
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
                <span>{likes} likes</span> {/* Added "likes" for clarity */}
              </div>
            </div>
            {/* Edit and Delete buttons for volunteers and admins */}
            {!isClientView && onEdit && onDelete && canEdit && (
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
  currentPage,
  onPageChange,
  activeFilters,
  onFilterChange,
  totalPages,
  total, // New prop: Total matching videos
  isAdminView = false, // Add isAdminView prop
}) => {
  const [openDropdown, setOpenDropdown] = useState(null); // Keep only this internal state

  // Get the current user ID from localStorage
  const userId = localStorage.getItem("userId");

  // Updated to match database values (lowercase for consistency), and conditionally add "Uploaded By" for volunteers only
  const defaultFilterOptions = {
    Lengte: ["Gemiddeld (5-25 min)", "Lang (25+ min)"], // Removed short filter, only medium and long
    Locatie: [], // Now using search input instead of dropdown (includes province and municipality search)
    Seizoen: ["spring", "summer", "autumn", "winter"], // Changed to lowercase
    Natuurtype: [
      "Bos",
      "Heide",
      "Duinen",
      "Grasland / weiland",
      "Water, moeras, rivier & meren",
      "Stadsgroen & park",
    ], // Updated nature types as requested
    Geluidsprikkels: ["birds", "water", "wind", "forest sounds"], // Restored sound options
    Dieren: [
      "Vogels",
      "Eenden",
      "Reeën",
      "Konijnen/hazen",
      "Egels",
      "Schapen",
      "Koeien",
      "Reptielen",
      "Kikkers",
      "Insecten",
      "Vlinders",
      "Bijen",
      "Libellen",
      "Zwanen",
    ], // Expanded animal options as requested
  };

  // Dynamic municipality options based on selected province
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

  // Only add "Uploaded By" filter for volunteers (when not client view and not admin view)
  if (!isClientView && !isAdminView) {
    defaultFilterOptions["Uploaded By"] = ["Me"];
  }

  const filterOptions = customFilterOptions || { ...defaultFilterOptions };

  const handleFilterClick = (filter) => {
    setOpenDropdown(openDropdown === filter ? null : filter);
  };

  const handleOptionSelect = (filter, option) => {
    // Store filters using frontend names (not backend names) so parent components can map them correctly
    const updatedFilters = {
      ...activeFilters,
      [filter]: activeFilters[filter]?.includes(option)
        ? activeFilters[filter].filter((item) => item !== option)
        : [...(activeFilters[filter] || []), option],
    };

    onFilterChange(updatedFilters); // Call prop callback
    setOpenDropdown(null);
  };

  // Remove client-side filtering and slicing
  const filteredVideos = videos; // Videos are already filtered and paginated from server

  // Instead, use the full videos array (already paginated)
  const paginatedVideos = filteredVideos;

  const handlePageChange = (page) => {
    onPageChange(page); // Call prop callback
  };

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Remove useEffect for resetting page on filters (handled by parent)

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
            {Object.keys(filterOptions).map((filter) => {
              // Render Locatie as a search input instead of dropdown
              if (filter === "Locatie") {
                return (
                  <div key={filter} className="relative">
                    <input
                      type="text"
                      placeholder="Zoek locatie, provincie of gemeente..."
                      value={activeFilters[filter]?.[0] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          onFilterChange({
                            ...activeFilters,
                            [filter]: [value],
                          });
                        } else {
                          const newFilters = { ...activeFilters };
                          delete newFilters[filter];
                          onFilterChange(newFilters);
                        }
                      }}
                      className="pt-[0.6875rem] pb-[0.6875rem] px-5 h-[3.125rem] rounded-lg font-['Poppins'] font-medium transition-all duration-200 bg-[#f8f5f0] text-[#381207] hover:bg-[#e6d9cd] border border-[#d4c4b7] focus:outline-none focus:ring-2 focus:ring-[#dd9219]"
                    />
                  </div>
                );
              }

              // Check if this filter has active selections using frontend names
              return (
                <FilterButton
                  key={filter}
                  label={filter}
                  onClick={() => handleFilterClick(filter)}
                  isActive={activeFilters[filter]?.length > 0}
                  options={openDropdown === filter ? filterOptions[filter] : []}
                  onOptionSelect={(option) =>
                    handleOptionSelect(filter, option)
                  }
                />
              );
            })}
          </div>
        )}

        {/* Active filters display */}
        {Object.keys(activeFilters).some(
          (key) => activeFilters[key]?.length > 0
        ) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(activeFilters).map(([filterName, options]) => {
              // Use frontend filter names directly (no mapping needed)
              const displayFilterName = filterName;

              return options?.map((option) => (
                <div
                  key={`${filterName}-${option}`}
                  className="flex items-center gap-2 px-3 py-1 bg-[#381207] text-[#ede4dc] rounded-lg text-sm"
                >
                  <span>{option}</span>
                  <button
                    onClick={() =>
                      handleOptionSelect(displayFilterName, option)
                    }
                    className="text-[#ede4dc] hover:text-[#dd9219]"
                  >
                    ×
                  </button>
                </div>
              ));
            })}
          </div>
        )}

        {/* Results count */}
        {showResultsCount && (
          <div className="mb-4">
            <span className="text-[#381207] font-['Poppins'] text-sm">
              {total} video{total !== 1 ? "s" : ""} found
            </span>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {paginatedVideos.length > 0 ? (
            paginatedVideos.map((video) => (
              <VideoCard
                key={video._id || video.id}
                videoId={video._id || video.id}
                title={video.title}
                duration={video.duration}
                location={video.location}
                thumbnail={video.imgUrl}
                tags={video.tags || []}
                views={video.views ?? 0}
                likes={video.likes ?? 0}
                onSelect={() => onVideoSelect(video._id || video.id)}
                showStats={showStats}
                isClientView={isClientView}
                onEdit={onVideoEdit}
                onDelete={onVideoDelete}
                uploadedBy={video.uploadedBy}
                isAdminView={isAdminView}
                isApproved={video.isApproved}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-[#381207] font-['Poppins'] text-lg">
                {emptyStateMessage}
              </p>
              <button
                onClick={() => onFilterChange({})} // Clear filters via prop
                className="mt-4 px-4 py-2 bg-[#dd9219] text-white font-['Poppins'] rounded hover:bg-[#c47a15] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-[#f8f5f0] text-[#381207] rounded hover:bg-[#e6d9cd] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded ${
                  currentPage === page
                    ? "bg-[#381207] text-[#ede4dc]"
                    : "bg-[#f8f5f0] text-[#381207] hover:bg-[#e6d9cd]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-[#f8f5f0] text-[#381207] rounded hover:bg-[#e6d9cd] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGridWithFilters;
