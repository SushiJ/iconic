"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckIcon, ClipboardIcon, Download, View } from "lucide-react";

import { api } from "~/utils/api";
import { useDelay } from "~/hooks/useDelay";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Skeleton } from "~/components/ui/skeleton";
import NotAuthenticated from "~/components/NotAuthenticated";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { DownloadImageComponent } from "~/components/Download";

const COLORS = [
  "red",
  "green",
  "blue",
  "white",
  "black",
  "pink",
  "orange",
  "yellow",
  "cyan",
  "purple",
] as const;

const SHAPES = ["rectangular", "circular", "rounded"] as const;
const STYLES = ["claymorphic", "3d", "pixelated", "illustrated"] as const;

const formSchema = z.object({
  prompt: z
    .string({
      required_error: "Prompt is required",
    })
    .min(10, {
      message: "minimum should be 10 characters",
    }),
  color: z.enum(COLORS, {
    required_error: "Need to select a color.",
  }),
  shape: z.enum(SHAPES, {
    required_error: "Need to select a shape.",
  }),
  style: z.enum(STYLES, {
    required_error: "Need to select a style.",
  }),
  numberIcons: z.preprocess(
    (value) => {
      if (typeof value === "string") {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? undefined : parsed;
      }
      return value;
    },
    z.number().min(1).max(5, {
      message: "max limit is 5",
    }),
  ),
});

export default function Generate() {
  const { status } = useSession();
  const delay = useDelay(500);
  const [imageUrl, setImageUrl] = useState<Array<{ imageUrl: string }>>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      numberIcons: 1,
    },
  });
  const utils = api.useUtils();

  const { mutate, isPending } = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      setImageUrl(data);
      utils.user.invalidate();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values);
  }

  if (status === "loading" || delay)
    return (
      <div className="grid h-full place-items-center">
        <div className="my-auto w-[800px] bg-gray-100 bg-opacity-5 p-4 backdrop-blur">
          <div className="space-y-12">
            <div className="space-y-2">
              <Skeleton className="h-3 w-[310px]" />
              <Skeleton className="h-3 w-[500px]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-[180px]" />
              <div className="flex w-full justify-between space-x-3">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, idx) => (
                  <Skeleton className="h-3 w-12" key={idx} />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-[180px]" />
              <div className="flex w-full space-x-3">
                {[1, 1, 1].map((_, idx) => (
                  <Skeleton className="h-3 w-24" key={idx} />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-[180px]" />
              <div className="flex w-full space-x-3">
                {[1, 1, 1].map((_, idx) => (
                  <Skeleton className="h-3 w-28" key={idx} />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-[250px]" />
              <Skeleton className="h-3 w-[500px]" />
            </div>
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    );

  if (status === "unauthenticated") return <NotAuthenticated />;

  return (
    <>
      <div className="grid h-full w-full place-items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-gray-100 bg-opacity-5 p-4 backdrop-blur"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    1. Describe what your icon should look like
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Prompt here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>2. Pick an icon color</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-1"
                    >
                      {/* COLORS */}
                      {COLORS.map((c) => (
                        <FormItem
                          key={c}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={c} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {c.slice(0, 1).toUpperCase() + c.slice(1)}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shape"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>3. Pick an icon shape</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-1"
                    >
                      {/* SHAPES */}
                      {SHAPES.map((s) => (
                        <FormItem
                          key={s}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={s} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {s.slice(0, 1).toUpperCase() + s.slice(1)}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>4. Pick an icon style</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-1"
                    >
                      {/* STYLES */}
                      {STYLES.map((style) => (
                        <FormItem
                          key={style}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={style} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {style.slice(0, 1).toUpperCase() + style.slice(1)}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberIcons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    5. Number of icons{" "}
                    <span className="text-gray-500/75">(max. 5)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      defaultValue={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {status === "authenticated" ? (
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            ) : (
              <Button
                onClick={() => void signIn()}
                variant="link"
                type="button"
              >
                Sign In
              </Button>
            )}
          </form>
        </Form>
        {imageUrl.length > 0 ? (
          <>
            <div className="mt-2 grid grid-cols-3 gap-1">
              {imageUrl.map((u, idx) => (
                <Popover key={idx}>
                  <PopoverTrigger>
                    <img src={u.imageUrl} />
                  </PopoverTrigger>
                  <PopoverContent
                    side="top"
                    className="rounded border-4 border-double border-white bg-gray-400 bg-opacity-10 px-4 backdrop-blur"
                  >
                    <DownloadImageComponent url={u.imageUrl} src="" />
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
