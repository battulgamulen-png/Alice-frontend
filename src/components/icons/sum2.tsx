import * as React from "react";

interface SumIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export default function Sum2({
  size = 24,
  color = "currentColor",
  strokeWidth = 4,
}: SumIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 4 L17 12 L9 20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
