import React from "react";
import { isVimeoUrl } from "../utils/videoUtils";
import BgVideo from "../assets/BgVideo.mp4";

const VideoPlayer = ({
  videoUrl,
  title = "Video",
  className = "",
  aspectRatio = "16/9",
  fallbackVideo = BgVideo,
  onError = null,
  ...props
}) => {
  const isVimeo = isVimeoUrl(videoUrl);

  const handleVideoError = (e) => {
    console.error("Video failed to load:", e);
    if (onError) {
      onError(e);
    } else {
      e.target.src = fallbackVideo;
    }
  };

  return (
    <div
      className={`bg-black rounded-lg sm:rounded-2xl overflow-hidden ${className}`}
    >
      {isVimeo ? (
        <iframe
          src={videoUrl}
          className="w-full h-auto"
          style={{ aspectRatio }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
          {...props}
        ></iframe>
      ) : (
        <video
          src={videoUrl || fallbackVideo}
          controls
          className="w-full h-auto object-cover"
          style={{ aspectRatio }}
          onError={handleVideoError}
          title={title}
          {...props}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
