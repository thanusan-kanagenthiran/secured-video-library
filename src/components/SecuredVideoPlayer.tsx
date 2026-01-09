// Re-export from new modular structure for backward compatibility
export { SecuredVideoPlayer as default } from "./video-player";

// Also export sub-components for direct use
export {
  VideoControls,
  VideoThumbnail,
  ProtectionOverlay,
  BufferingSpinner,
  PlayButton,
  useVideoPlayer,
  getYouTubeId,
  formatTime,
} from "./video-player";

export type {
  YTPlayer,
  YTPlayerEvent,
  VideoPlayerState,
  VideoPlayerActions,
} from "./video-player";
