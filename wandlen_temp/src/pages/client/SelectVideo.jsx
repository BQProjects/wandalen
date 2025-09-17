import React from "react";
import { useNavigate } from "react-router-dom";
import BgVideo from "../../assets/BgVideo.mp4";
import VideoGridWithFilters from "../../components/common/VideoGridWithFilters";

const SelectVideo = () => {
  const navigate = useNavigate();

  const videos = [
    {
      id: 1,
      title: "Korte wandeling Holterberg",
      duration: "15 min",
      location: "Hellendoorn, Nederland",
      thumbnail: BgVideo,
      tags: ["Opkomende zon", "Kinderen", "Wilde dieren", "Bos"],
      views: 320,
      likes: 123,
    },
    {
      id: 2,
      title: "Boswandeling met vogels",
      duration: "25 min",
      location: "Lemele, Nederland",
      thumbnail: BgVideo,
      tags: ["Winter", "Sneeuw", "Gouden gras", "Vogels", "Bos"],
      views: 450,
      likes: 89,
    },
    {
      id: 3,
      title: "Strandwandeling zonsondergang",
      duration: "30 min",
      location: "Lemelerveld, Noordzee kust",
      thumbnail: BgVideo,
      tags: ["Winter", "Koeien", "Rustig briesje", "Strand"],
      views: 200,
      likes: 67,
    },
    {
      id: 4,
      title: "Bergpad met uitzicht",
      duration: "20 min",
      location: "Luttenberg, Nederland",
      thumbnail: BgVideo,
      tags: ["Vogels", "Opkomende zon", "Heide"],
      views: 300,
      likes: 150,
    },
    {
      id: 5,
      title: "Rustige rivierwandeling",
      duration: "50 min",
      location: "Raalte, IJssel",
      thumbnail: BgVideo,
      tags: ["Kinderen", "Wilde dieren", "Water", "Zomer"],
      views: 280,
      likes: 95,
    },
    {
      id: 6,
      title: "Herfstkleuren in het bos",
      duration: "22 min",
      location: "Hellendoorn, Utrechtse Heuvelrug",
      thumbnail: BgVideo,
      tags: ["Sneeuw", "Gouden gras", "Herfst", "Bos"],
      views: 400,
      likes: 110,
    },
  ];

  const handleVideoSelect = (id) => {
    navigate(`video/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#ede4dc]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#381207] mb-4">
            Select Your Video
          </h1>
          <p className="text-lg text-[#6b5b4a] max-w-2xl">
            Discover the perfect nature walk video for your relaxation and
            mindfulness journey.
          </p>
        </div>

        {/* Video Grid with Filters */}
        <VideoGridWithFilters
          videos={videos}
          onVideoSelect={handleVideoSelect}
          title="Available Nature Videos"
          subtitle="Discover beautiful nature walks from our volunteers."
          showFilters={true}
          showStats={false}
          isClientView={true}
          emptyStateMessage="No nature videos available at the moment."
          showResultsCount={true}
        />

        {/* Favorites Section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-[#381207] rounded-2xl p-8 text-center text-[#ede4dc]">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h3 className="text-2xl font-semibold text-[#dd9219]">
                Your Favorite Videos
              </h3>
            </div>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed">
              Easily find and enjoy the videos you love most, anytime. Build
              your personal collection of nature walks that bring you peace and
              tranquility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectVideo;
