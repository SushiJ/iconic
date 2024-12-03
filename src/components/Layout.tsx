import { type ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Nav";
import Head from "next/head";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Iconic</title>
        <meta name="description" content="Iconic, generate icons with AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container relative mx-auto flex h-screen flex-col font-sans text-neutral-800 antialiased">
        <Navbar />
        {/* <DisplayTailwindWidth /> */}
        <div className="flex-1 flex-shrink-0">{children}</div>
        <Footer />
      </main>
    </>
  );
}

function DisplayTailwindWidth() {
  return (
    <div>
      {/* Mobile Screen */}
      <div className="block sm:hidden">
        <p>This is displayed only on mobile screens (sm and below).</p>
      </div>

      {/* Tablet Screen */}
      <div className="hidden sm:block md:hidden">
        <p>This is displayed only on tablet screens (sm to md).</p>
      </div>

      {/* Desktop Screen */}
      <div className="hidden md:block lg:hidden">
        <p>This is displayed only on desktop screens (md to lg).</p>
      </div>

      {/* Large Desktop Screen */}
      <div className="hidden lg:block">
        <p>This is displayed only on large desktop screens (lg and above).</p>
      </div>
    </div>
  );
}
