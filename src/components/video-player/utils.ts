// Extract YouTube video ID from various URL formats
export function getYouTubeId(input: string): string | null {
  const idRegex = /^[a-zA-Z0-9_-]{11}$/;
  if (idRegex.test(input)) return input;

  try {
    const url = new URL(input.trim());
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0] || "";
      return idRegex.test(id) ? id : null;
    }
    if (url.hostname.includes("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v && idRegex.test(v)) return v;
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length >= 2 && ["embed", "shorts", "v"].includes(parts[0])) {
        const id = parts[1];
        return idRegex.test(id) ? id : null;
      }
    }
  } catch {
    // not a URL
  }
  return null;
}

// Format seconds to MM:SS
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
