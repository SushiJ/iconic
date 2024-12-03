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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { DownloadImageComponent } from "~/components/Download";

export default function Profile() {
  const { status } = useSession();
  const { data: userInfo } = api.user.getUserInfo.useQuery();
  const delay = useDelay(1000);

  if (status === "loading" || delay) {
    return (
      <div className="grid gap-2 p-2 xl:grid-cols-4">
        <section className="xl:col-span-3">
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
      <div className="grid gap-2 p-2 xl:grid-cols-4">
        <section className="mx-auto xl:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>All icons</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-8">
              {userInfo?.userIcons.map((icon, idx) => {
                return (
                  <div className="my-4" key={icon.id}>
                    <div>
                      {idx % 2 === 0 || idx % 3 === 0 ? (
                        <Popover key={idx}>
                          <PopoverTrigger>
                            <img
                              src={`data:image/png;base64, ${b64Image}`}
                              className="rounded"
                            />
                          </PopoverTrigger>
                          <PopoverContent
                            side="top"
                            className="rounded border-4 border-double border-white bg-gray-400 bg-opacity-10 px-4 backdrop-blur"
                          >
                            <DownloadImageComponent
                              url=""
                              src={`data:image/png;base64, ${b64Image}`}
                              isBase64
                              name={icon.prompt?.toString() + ".png"}
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Popover key={idx}>
                          <PopoverTrigger>
                            <img
                              src={`data:image/png;base64, ${b64Image2}`}
                              className="rounded"
                            />
                          </PopoverTrigger>
                          <PopoverContent
                            side="top"
                            className="rounded border-4 border-double border-white bg-gray-400 bg-opacity-10 px-4 backdrop-blur"
                          >
                            <DownloadImageComponent
                              url=""
                              src={`data:image/png;base64, ${b64Image2}`}
                              isBase64
                              name={icon.prompt?.toString() + ".png"}
                            />
                          </PopoverContent>
                        </Popover>
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
