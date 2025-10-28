import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 20v-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
      <path d="M12 12V4" />
      <path d="M12 4H8" />
      <path d="M12 4h4" />
      <path d="M4 20h16" />
    </svg>
  );
}
