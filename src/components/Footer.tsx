import Link from "next/link";
export default function Footer() {
  return (
    <nav className="sticky bottom-0 mx-auto mt-2 h-48 w-full rounded-t-xl bg-black px-4 text-neutral-200 backdrop-blur-md">
      <div className="grid grid-cols-3">
        <Link href="/" className="text-5xl font-bold">
          Iconic
        </Link>
        <ul className="space-x-2">
          <li>community</li>
        </ul>
      </div>
      <p className="mx-auto">Copyright and shit</p>
    </nav>
  );
}
