"use client";

import { useVideoPlayer } from "./useVideoPlayer";
import VideoControls from "./VideoControls";
import VideoThumbnail from "./VideoThumbnail";
import ProtectionOverlay from "./ProtectionOverlay";
import BufferingSpinner from "./BufferingSpinner";
import PlayButton from "./PlayButton";

interface SecuredVideoPlayerProps {
  videoUrl: string;
  className?: string;
}

export default function SecuredVideoPlayer({
  videoUrl,
  className = "w-full aspect-video",
}: SecuredVideoPlayerProps) {
  const { state, containerRef, playerContainerRef, videoId, actions } = useVideoPlayer({ videoUrl });

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden select-none ${state.isFullscreen ? "w-full h-full" : className
        }`}
      onContextMenu={actions.handleContextMenu}
      onMouseMove={actions.handleMouseMove}
      onMouseLeave={actions.handleMouseLeave}
    >
      {/* YouTube Player Container */}
      <div className="absolute inset-0">
        <div
          ref={playerContainerRef}
          className="w-full h-full pointer-events-none"
        />
      </div>

      {/* Protection overlay - shown when tab hidden or DevTools open */}
      <ProtectionOverlay
        type={state.devToolsOpen ? "devtools" : "hidden"}
        visible={state.isHidden || state.devToolsOpen}
      />

      {/* Thumbnail overlay */}
      <VideoThumbnail
        videoId={videoId}
        isReady={state.isReady}
        visible={state.showThumbnail}
        onClick={actions.togglePlay}
        onContextMenu={actions.handleContextMenu}
      />

      {/* Clickable overlay for play/pause (when video is playing) */}
      {!state.showThumbnail && (
        <div
          className="absolute inset-0 z-10"
          onClick={actions.togglePlay}
          onContextMenu={actions.handleContextMenu}
        />
      )}

      {/* Buffering indicator */}
      {state.isBuffering && !state.showThumbnail && <BufferingSpinner size="lg" />}

      {/* Play button overlay when paused (after first play) */}
      {!state.isPlaying && !state.showThumbnail && !state.isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <PlayButton size="lg" variant="overlay" />
        </div>
      )}

      {/* Video Controls */}
      <VideoControls
        isPlaying={state.isPlaying}
        isMuted={state.isMuted}
        volume={state.volume}
        currentTime={state.currentTime}
        duration={state.duration}
        isFullscreen={state.isFullscreen}
        visible={state.showControls}
        onTogglePlay={actions.togglePlay}
        onToggleMute={actions.toggleMute}
        onVolumeChange={actions.handleVolumeChange}
        onSeek={actions.handleSeek}
        onToggleFullscreen={actions.toggleFullscreen}
      />
    </div>
  );
}
