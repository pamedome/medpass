import type { SVGProps } from "react"

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 170 40"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(5, 2)">
        {/* Icon */}
        <g fill="hsl(var(--primary))" transform="skewX(-10)">
            {/* Heads */}
            <circle cx="11" cy="8" r="4.5" />
            <circle cx="25" cy="8" r="4.5" />
            {/* Bodies */}
            <rect x="6" y="15" width="10" height="18" rx="3" />
            <rect x="20" y="15" width="10" height="18" rx="3" />
        </g>
        {/* Text */}
        <text
            x="45"
            y="30"
            fontFamily="Inter, sans-serif"
            fontSize="24"
            fontWeight="700"
            letterSpacing="1"
        >
            <tspan fill="hsl(var(--primary))">MED</tspan>
            <tspan fill="hsl(var(--accent))">PASS</tspan>
        </text>
      </g>
    </svg>
  );
}
