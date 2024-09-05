"use client";

import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

import NotAuthenticated from "~/components/NotAuthenticated";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Profile() {
  const { status } = useSession();
  const { data: userInfo } = api.user.getUserInfo.useQuery();

  if (status === "loading") return <div>Loading....</div>;
  if (status === "unauthenticated") return <NotAuthenticated />;

  return (
    <>
      <div className="grid grid-cols-4 gap-2 p-1">
        <Card className="col-span-1 h-40">
          <CardHeader className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage
                src={userInfo ? (userInfo.user?.image as string) : ""}
              />
              <AvatarFallback>
                {userInfo ? userInfo.user?.name?.split("")[0] : "Ic"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{userInfo?.user?.name}</CardTitle>
              <CardDescription>{userInfo?.user?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p>Credits: {userInfo?.user?.credits}</p>
          </CardContent>
        </Card>
        <section className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Icons history</CardTitle>
              <CardDescription>generated icons details</CardDescription>
            </CardHeader>
            <CardContent>
              {userInfo?.userIcons.map((icon) => {
                return (
                  <div className="my-4">
                    <div>
                      <p>
                        {icon.createdAt
                          ? new Date(
                              icon.createdAt.split(" ").join("T"),
                            ).toLocaleString()
                          : ""}
                      </p>
                      <p>{icon.prompt}</p>
                      <p>{icon.id}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
