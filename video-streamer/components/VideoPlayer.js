import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ src, type }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // cleanup previous player if any
    if (playerRef.current) {
      playerRef.current.dispose();
    }

    // init player
    playerRef.current = videojs(videoRef.current, {
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src,
          type: type || undefined,
        },
      ],
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, type]);

  return (
    <div>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          controls
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
