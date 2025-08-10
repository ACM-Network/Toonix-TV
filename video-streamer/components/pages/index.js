import React, { useState } from "react";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("../video-streamer/components/VideoPlayer"), {
  ssr: false,
});

const getMimeType = (url) => {
  if (!url) return "";
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
  const [url, setUrl] = useState("");
  const [currentSrc, setCurrentSrc] = useState("");
  const [currentType, setCurrentType] = useState("");

  const handlePlayUrl = () => {
    setCurrentSrc(url);
    setCurrentType(getMimeType(url));
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const blobUrl = URL.createObjectURL(f);
    setCurrentSrc(blobUrl);
    setCurrentType(f.type || "");
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>Toonix TV - Test Player</h1>

      <div style={{ marginBottom: 16 }}>
        <input
          style={{ width: "80%", marginRight: 8 }}
          placeholder="Paste video URL (mp4, m3u8, mpd...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handlePlayUrl}>Play</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input type="file" accept=".mp4,.mkv,.m3u8,.mpd,.ts,.webm" onChange={handleFile} />
      </div>

      {currentSrc ? (
        <div>
          <VideoPlayer src={currentSrc} type={currentType} />
          <p style={{ marginTop: 12, color: "gray" }}>
            Supports Multi-Audio (auto detect) + Max Quality
          </p>
        </div>
      ) : (
        <p>No source selected yet.</p>
      )}
    </div>
  );
        }
