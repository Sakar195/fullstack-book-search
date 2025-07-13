interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "white" | "blue" | "gray";
}

export const LoadingSpinner = ({
  size = "md",
  color = "white",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-8 w-8",
  };

  const colorClasses = {
    white: "border-white",
    blue: "border-blue-600",
    gray: "border-gray-600",
  };

  return (
    <div
      className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}
      aria-label="Loading"
    />
  );
};
