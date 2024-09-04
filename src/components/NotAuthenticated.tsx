import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function NotAuthenticated() {
  return (
    <div className="my-auto grid h-full place-items-center">
      <section className="rounded border-4 border-double border-white bg-gray-400 bg-opacity-10 p-4 backdrop-blur">
        <p className="text-sm">Uh, oh</p>
        <p className="text-2xl">Looks like you're not logged in</p>
        <p className="text-sm">
          Let's fix that. click
          <Button variant="link" onClick={() => void signIn()}>
            here
          </Button>
          to sign-in
        </p>
      </section>
    </div>
  );
}
