import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { data: sessionData } = useSession();

  return (
    <nav className="sticky top-0 z-50 mx-auto flex h-20 w-full items-center rounded-b-xl border-black bg-black/95 px-4 text-neutral-200 backdrop-blur supports-[backdrop-filter]:bg-black/90">
      <div className="flex flex-1 items-center">
        <Link
          href="/"
          className="me-6 text-2xl font-bold hover:text-neutral-200/80"
        >
          Iconic
        </Link>
        <ul className="space-x-2">
          <Link
            href="/community"
            className={cn(
              "transition-colors hover:text-neutral-200/80",
              pathname === "/community"
                ? "text-neutral-200"
                : "text-neutral-200/60",
            )}
          >
            community
          </Link>
          <Link
            href="/generate"
            className={cn(
              "transition-colors hover:text-neutral-200/80",
              pathname === "/generate"
                ? "text-neutral-200"
                : "text-neutral-200/60",
            )}
          >
            generate
          </Link>
        </ul>
      </div>
      <p className="me-2">
        {sessionData ? sessionData.user.name?.split(" ")[0] : ""}
      </p>
      <div>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
}
