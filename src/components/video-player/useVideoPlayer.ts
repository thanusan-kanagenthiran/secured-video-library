"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { YTPlayer, YTPlayerEvent } from "./types";
import { getYouTubeId } from "./utils";

interface UseVideoPlayerOptions {
  videoUrl: string;
}

export function useVideoPlayer({ videoUrl }: UseVideoPlayerOptions) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const wasPlayingBeforeHide = useRef(false);

  const videoId = getYouTubeId(videoUrl) || "";

  // Load YouTube IFrame API
  useEffect(() => {
    let checkInterval: NodeJS.Timeout | null = null;

    const loadApi = () => {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => setApiReady(true);

      checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          setApiReady(true);
          if (checkInterval) clearInterval(checkInterval);
        }
      }, 100);
    };

    const timeoutId = setTimeout(loadApi, 0);

    return () => {
      clearTimeout(timeoutId);
      if (checkInterval) clearInterval(checkInterval);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Progress tracking
  const startProgressTracking = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 250);
  }, []);

  const stopProgressTracking = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  }, []);

  // Initialize player
  useEffect(() => {
    if (!apiReady || !playerContainerRef.current || playerRef.current) return;

    playerRef.current = new window.YT.Player(playerContainerRef.current, {
      videoId: videoId,
      width: "100%",
      height: "100%",
      playerVars: {
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        playsinline: 1,
        enablejsapi: 1,
        origin: typeof window !== "undefined" ? window.location.origin : "",
      },
      events: {
        onReady: (event: YTPlayerEvent) => {
          setIsReady(true);
          setDuration(event.target.getDuration());
          setVolume(event.target.getVolume());
        },
        onStateChange: (event: YTPlayerEvent) => {
          switch (event.data) {
            case window.YT.PlayerState.PLAYING:
              setIsPlaying(true);
              setIsBuffering(false);
              setShowThumbnail(false);
              startProgressTracking();
              break;
            case window.YT.PlayerState.PAUSED:
              setIsPlaying(false);
              stopProgressTracking();
              break;
            case window.YT.PlayerState.BUFFERING:
              setIsBuffering(true);
              break;
            case window.YT.PlayerState.ENDED:
              setIsPlaying(false);
              stopProgressTracking();
              break;
          }
        },
      },
    });
  }, [apiReady, videoId, startProgressTracking, stopProgressTracking]);

  // Visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlaying && playerRef.current) {
          wasPlayingBeforeHide.current = true;
          playerRef.current.pauseVideo();
        }
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    const handleBlur = () => {
      if (isPlaying && playerRef.current) {
        wasPlayingBeforeHide.current = true;
        playerRef.current.pauseVideo();
      }
      setIsHidden(true);
    };

    const handleFocus = () => {
      setIsHidden(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isPlaying]);

  // DevTools detection
  useEffect(() => {
    const threshold = 160;

    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
          setDevToolsOpen(true);
          if (isPlaying && playerRef.current) {
            playerRef.current.pauseVideo();
          }
        }
      } else {
        setDevToolsOpen(false);
      }
    };

    const interval = setInterval(detectDevTools, 1000);
    window.addEventListener("resize", detectDevTools);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", detectDevTools);
    };
  }, [isPlaying, devToolsOpen]);

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Actions
  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  }, [isMuted]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = Number(e.target.value);
      setVolume(newVolume);
      if (playerRef.current) {
        playerRef.current.setVolume(newVolume);
        if (newVolume === 0) {
          playerRef.current.mute();
          setIsMuted(true);
        } else if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        }
      }
    },
    [isMuted]
  );

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    setCurrentTime(seekTime);
    if (playerRef.current) {
      playerRef.current.seekTo(seekTime, true);
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, []);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) {
      setShowControls(false);
    }
  }, [isPlaying]);

  return {
    // State
    state: {
      isReady,
      isPlaying,
      isMuted,
      volume,
      currentTime,
      duration,
      isFullscreen,
      showControls,
      isBuffering,
      showThumbnail,
      isHidden,
      devToolsOpen,
    },
    // Refs - returned directly, not nested in an object accessed during render
    containerRef,
    playerContainerRef,
    // Video info
    videoId,
    // Actions
    actions: {
      togglePlay,
      toggleMute,
      handleVolumeChange,
      handleSeek,
      toggleFullscreen,
      handleContextMenu,
      handleMouseMove,
      handleMouseLeave,
    },
  };
}
