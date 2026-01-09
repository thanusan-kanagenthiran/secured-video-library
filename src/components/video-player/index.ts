// Main component
export { default as SecuredVideoPlayer } from "./SecuredVideoPlayer";

// Reusable sub-components
export { default as VideoControls } from "./VideoControls";
export { default as VideoThumbnail } from "./VideoThumbnail";
export { default as ProtectionOverlay } from "./ProtectionOverlay";
export { default as BufferingSpinner } from "./BufferingSpinner";
export { default as PlayButton } from "./PlayButton";

// Hook for custom implementations
export { useVideoPlayer } from "./useVideoPlayer";

// Utilities
export { getYouTubeId, formatTime } from "./utils";

// Types
export type {
  YTPlayer,
  YTPlayerEvent,
  VideoPlayerState,
  VideoPlayerActions,
} from "./types";
