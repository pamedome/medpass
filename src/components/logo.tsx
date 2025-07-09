import type { SVGProps } from "react"

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 52 52" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="26" cy="26" r="26" fill="currentColor"/>
      <path d="M17 26C17 26 21 32 26 32C31 32 37 23 37 23" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
