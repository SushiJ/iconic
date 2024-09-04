import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Button } from "~/components/ui/button";

export default function Index() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  function handleClick() {
    if (sessionData && sessionData.user) {
      router.push("/generate");
    } else {
      router.push("/api/auth/signin");
    }
  }
  return (
    <>
      <div className="my-auto grid h-full grid-cols-2 place-items-center px-1">
        <div className="space-y-6">
          <h1 className="text-6xl leading-tight">
            Generate icons with the help of AI
          </h1>
          <p className="max-w-96 text-lg">
            Use ai to generate icons for you, get you business an identity
            quickly
          </p>
          <Button variant="default" onClick={handleClick}>
            Get started
          </Button>
        </div>
        <img
          src="./hero_image_white.jpg"
          style={{
            transform: "scaleX(-1)",
            width: "250",
            height: "250",
          }}
        />
      </div>
    </>
  );
}
