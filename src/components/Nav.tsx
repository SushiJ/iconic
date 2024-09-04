import { signIn, signOut, useSession } from "next-auth/react";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { useGetCredits } from "~/hooks/useGetCredits";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const { data: sessionData } = useSession();
  const buyCredits = useGetCredits();
  const { data: credits, isPending } = api.user.getUserCredits.useQuery();

  return (
    <nav className="sticky top-0 z-10 mx-auto mt-4 flex min-h-20 w-full items-center rounded border-4 border-double border-white bg-gray-400 bg-opacity-10 px-4 backdrop-blur">
      <div className="container flex flex-1 items-center">
        <Link
          href="/"
          className="me-6 text-2xl font-bold hover:text-neutral-700/80"
        >
          Iconic
        </Link>
        <ul className="space-x-2">
          <Link
            href="/community"
            className={cn(
              "transition-colors hover:text-neutral-500/80",
              pathname === "/community" ? "text-black" : "text-black/65",
            )}
          >
            community
          </Link>
          <Link
            href="/generate"
            className={cn(
              "transition-colors hover:text-neutral-500/80",
              pathname === "/generate" ? "text-black" : "text-black/65",
            )}
          >
            generate
          </Link>
        </ul>
      </div>
      <p className="me-2">
        {/*  TODO: Style this, and make it so when you're logged in it doesn't show up loading */}
        {sessionData
          ? isPending
            ? "Loading credits..."
            : `${credits} credits remaining`
          : ""}
      </p>
      {sessionData ? (
        <Button
          onClick={() => buyCredits().catch((err) => console.log(err))}
          className="mx-1 text-black/80"
          variant="outline"
        >
          Buy credits
        </Button>
      ) : null}
      {sessionData ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="z-20 w-56 border-4 border-double border-white bg-neutral-50 bg-opacity-5 font-sans backdrop-blur"
            alignOffset={-20}
            sideOffset={20}
          >
            <DropdownMenuItem className="hover:cursor-pointer">
              <Link href="/profile">
                {sessionData ? sessionData.user.name?.split(" ")[0] : ""}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer">
              Generated Icons
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : ""}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => void signIn()} variant="outline">
          Sign In
        </Button>
      )}
    </nav>
  );
}
