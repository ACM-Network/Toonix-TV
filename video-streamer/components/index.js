import React, { useState } from "react";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("../components/VideoPlayer"), {
  ssr: false,
});

const getMimeType = (url) => {
  if (url.endsWith(".m3u8")) return "application/x-mpegURL";
  if (url.endsWith(".mpd")) return "application/dash+xml";
  if (url.endsWith(".mp4")) return "video/mp4";
  if (url.endsWith(".webm")) return "video/webm";
  if (url.endsWith(".mkv")) return "video/x-matroska";
  if (url.endsWith(".ts")) return "video/mp2t";
  if (url.endsWith(".m3u")) return "application/vnd.apple.mpegurl";
  return "";
};

export default function Home() {
  const [videoURL, setVideoURL] = useState("");
  const [localUrl, setLocalUrl] = useState("");
  const [videoType, setVideoType] = useState("");

  const handleURL = (e) => {
    setVideoURL(e.target.value);
    setVideoType(getMimeType(e.target.value));
    setLocalUrl("");
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalUrl(URL.createObjectURL(file));
      setVideoType(file.type);
      setVideoURL("");
    }
  };

  const currentSrc = videoURL || localUrl;
  const currentType = videoType;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", textAlign: "center" }}>
      <h2>🎬 Universal Video Streamer</h2>
      <input
        type="text"
        placeholder="Enter Stream URL (.mp4, .m3u8, .mpd)"
        value={videoURL}
        onChange={handleURL}
        style={{ width: "70%", padding: "8px" }}
      />
      <p>OR</p>
      <input
        type="file"
        accept=".mp4,.mkv,.m3u8,.mpd,.ts"
        onChange={handleFile}
      />
      {currentSrc && <VideoPlayer src={currentSrc} type={currentType} />}
      <p style={{ marginTop: 24, color: "gray" }}>
        Supports Multi-Audio (auto detect) + Max Quality
      </p>
    </div>
  );
}
