"use client";

import { useSession } from "next-auth/react";
import NotAuthenticated from "~/components/NotAuthenticated";
import { api } from "~/utils/api";

export default function Profile() {
  const { status } = useSession();
  const { data: userInfo } = api.user.getUserInfo.useQuery();

  if (status === "loading") return <div>Loading....</div>;
  if (status === "unauthenticated") return <NotAuthenticated />;

  return (
    <>
      <div className="my-auto grid h-full grid-cols-2 place-items-center">
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      </div>
    </>
  );
}
