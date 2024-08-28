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
        <div className="flex-1 flex-shrink-0">{children}</div>
        <Footer />
      </main>
    </>
  );
}
