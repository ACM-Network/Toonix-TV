import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ src, type }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.dispose();
    }

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{ src, type }],
    });

    playerRef.current.on("loadedmetadata", () => {
      const audioTracks = playerRef.current.audioTracks();
      if (audioTracks && audioTracks.length > 1) {
        console.log(`Multiple audio tracks detected (${audioTracks.length})`);
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [src, type]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered vjs-default-skin"
      />
    </div>
  );
};

export default VideoPlayer;
