interface ProtectionOverlayProps {
  type: "devtools" | "hidden";
  visible: boolean;
}

export default function ProtectionOverlay({ type, visible }: ProtectionOverlayProps) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-lg font-semibold">
          {type === "devtools" ? "Developer tools detected" : "Video paused"}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          {type === "devtools"
            ? "Please close developer tools to continue watching"
            : "Return to this tab to continue watching"}
        </p>
      </div>
    </div>
  );
}
