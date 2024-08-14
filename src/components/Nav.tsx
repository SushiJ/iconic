import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 mx-auto flex h-20 w-full items-center rounded-b-xl border-black bg-black/95 px-4 text-neutral-200 backdrop-blur supports-[backdrop-filter]:bg-black/90">
      <div className="flex flex-1 items-center">
        <Link href="/" className="me-6 text-2xl font-bold">
          Iconic
        </Link>
        <ul className="space-x-2">
          <li>community</li>
        </ul>
      </div>
      <div>
        <p>Sign out</p>
      </div>
    </nav>
  );
}
