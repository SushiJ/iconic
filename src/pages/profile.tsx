"use client";

import { useSession } from "next-auth/react";

import NotAuthenticated from "~/components/NotAuthenticated";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Badge } from "~/components/ui/badge";

import { api } from "~/utils/api";
import { useDelay } from "~/hooks/useDelay";
import { b64Image, b64Image2 } from "~/data/b64";

export default function Profile() {
  const { status } = useSession();
  const { data: userInfo } = api.user.getUserInfo.useQuery();
  const delay = useDelay(1000);

  if (status === "loading" || delay) {
    return (
      <div className="grid grid-cols-4 gap-2 p-2">
        <Card className="col-span-1 h-40">
          <CardHeader className="flex flex-row items-center gap-2">
            <Avatar>
              <Skeleton className="h-14 w-14 rounded-full" />
              <AvatarFallback>
                <Skeleton className="h-14 w-14 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-[100px]" />
          </CardContent>
        </Card>
        <section className="col-span-3">
          <Card>
            <CardHeader>
              <Skeleton className="h-3 w-[80px]" />
              <Skeleton className="h-3 w-[150px]" />
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((v) => {
                return (
                  <div className="my-4" key={v}>
                    <div className="space-y-2">
                      <Skeleton className="h-[300px] w-[300px]" />
                      <Skeleton className="h-3 w-[250px]" />
                      <Skeleton className="h-3 w-[180px]" />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  if (status === "unauthenticated") return <NotAuthenticated />;

  return (
    <>
      <div className="grid grid-cols-4 gap-2 p-2">
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
        <section className="col-span-3 mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>generated icons details</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-8">
              {userInfo?.userIcons.map((icon, idx) => {
                return (
                  <div className="my-4" key={icon.id}>
                    <div>
                      {idx % 2 === 0 || idx % 3 === 0 ? (
                        <img
                          src={`data:image/png;base64, ${b64Image}`}
                          className="rounded"
                        />
                      ) : (
                        <img
                          src={`data:image/png;base64, ${b64Image2}`}
                          className="rounded"
                        />
                      )}
                      <p className="italic">"{icon.prompt}"</p>
                      <Badge variant="secondary" className="font-normal">
                        {icon.createdAt
                          ? new Date(
                              icon.createdAt.split(" ").join("T"),
                            ).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </Badge>
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
