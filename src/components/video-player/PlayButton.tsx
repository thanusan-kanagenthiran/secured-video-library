interface PlayButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "overlay";
  className?: string;
}

const sizeMap = {
  sm: { button: "w-12 h-12", icon: "w-6 h-6" },
  md: { button: "w-16 h-16", icon: "w-8 h-8" },
  lg: { button: "w-20 h-20", icon: "w-10 h-10" },
};

export default function PlayButton({
  size = "lg",
  variant = "solid",
  className = "",
}: PlayButtonProps) {
  const { button, icon } = sizeMap[size];
  const bgClass = variant === "solid"
    ? "bg-red-600 hover:bg-red-700"
    : "bg-red-600/90";

  return (
    <div
      className={`${button} ${bgClass} rounded-full flex items-center justify-center shadow-xl hover:scale-105 transform transition-all duration-200 ${className}`}
    >
      <svg className={`${icon} text-white ml-1`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}
