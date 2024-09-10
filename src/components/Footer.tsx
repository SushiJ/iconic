import Link from "next/link";
import { Heart } from "lucide-react";
export default function Footer() {
  return (
    <nav className="sticky bottom-0 mx-auto mt-2 min-h-20 w-full rounded-t border-4 border-double border-white bg-gray-400 bg-opacity-10 px-4 backdrop-blur">
      <p className="m-auto flex h-full w-full items-center justify-center text-xs">
        Made with
        <span className="mx-1 grid place-items-center">
          <Heart height="16" width="16" />
        </span>
        using
        <Link href="https://nextjs.org/" target="_blank" className="ms-1">
          Next
        </Link>
      </p>
    </nav>
  );
}
