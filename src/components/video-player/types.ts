// YouTube Player types
export interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

export interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

export interface VideoPlayerState {
  isReady: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  showControls: boolean;
  isBuffering: boolean;
  showThumbnail: boolean;
  isHidden: boolean;
  devToolsOpen: boolean;
}

export interface VideoPlayerActions {
  togglePlay: () => void;
  toggleMute: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFullscreen: () => void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        element: HTMLElement,
        options: {
          videoId: string;
          width: string;
          height: string;
          playerVars: Record<string, unknown>;
          events: {
            onReady: (event: YTPlayerEvent) => void;
            onStateChange: (event: YTPlayerEvent) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}
