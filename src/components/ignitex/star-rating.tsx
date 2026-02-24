import { Star } from "lucide-react";

interface StarRatingProps {
  /** Total stars to display (default 5) */
  count?: number;
  /** Filled star color variant */
  variant?: "yellow" | "black" | "white";
  /** Optional fractional rating for partial fill (e.g. 4.5) */
  rating?: number;
  className?: string;
}

const FILL_CLASSES = {
  yellow: "fill-yellow-400 text-yellow-400",
  black: "fill-black text-black",
  white: "fill-white text-white",
} as const;

const EMPTY_CLASS = "fill-gray-200 text-gray-200";

export function StarRating({
  count = 5,
  variant = "yellow",
  rating,
  className = "",
}: StarRatingProps) {
  const filled = rating !== undefined ? Math.floor(rating) : count;
  const hasHalf = rating !== undefined && rating % 1 >= 0.5;

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < filled || (i === filled && hasHalf)
              ? FILL_CLASSES[variant]
              : EMPTY_CLASS
          }`}
        />
      ))}
    </div>
  );
}
