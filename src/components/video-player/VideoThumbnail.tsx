"use client";

import { useRef, useEffect, useState } from "react";
import PlayButton from "./PlayButton";
import BufferingSpinner from "./BufferingSpinner";

interface VideoThumbnailProps {
  videoId: string;
  isReady: boolean;
  visible: boolean;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export default function VideoThumbnail({
  videoId,
  isReady,
  visible,
  onClick,
  onContextMenu,
}: VideoThumbnailProps) {
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  // Load thumbnail dynamically via JavaScript to hide URL from page source
  useEffect(() => {
    if (!videoId || !thumbnailRef.current) return;

    const thumbnailElement = thumbnailRef.current;
    let objectUrl: string | null = null;

    // Build URL parts separately to avoid appearing as a complete URL in source
    const host = ["https://", "img.youtube", ".com"].join("");
    const path = ["/vi/", videoId, "/maxresdefault.jpg"].join("");
    const url = host + path;

    // Load as blob to hide the actual URL
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        thumbnailElement.style.backgroundImage = `url(${objectUrl})`;
        setThumbnailLoaded(true);
      })
      .catch(() => {
        // Fallback with obfuscated URL
        thumbnailElement.style.backgroundImage = `url(${url})`;
        setThumbnailLoaded(true);
      });

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [videoId]);

  if (!visible) return null;

  return (
    <div
      ref={thumbnailRef}
      className="absolute inset-0 z-20 cursor-pointer bg-black"
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Play button - only show when thumbnail is loaded */}
      {thumbnailLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors">
          <PlayButton size="lg" variant="solid" />
        </div>
      )}
      {/* Loading spinner on thumbnail */}
      {(!isReady || !thumbnailLoaded) && <BufferingSpinner size="md" />}
    </div>
  );
}
