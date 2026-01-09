interface BufferingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-6 h-6 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-4",
};

export default function BufferingSpinner({
  size = "lg",
  className = "",
}: BufferingSpinnerProps) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none ${className}`}>
      <div className={`${sizeMap[size]} border-white/30 border-t-white rounded-full animate-spin`} />
    </div>
  );
}
