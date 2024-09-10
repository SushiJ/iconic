"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import NotAuthenticated from "~/components/NotAuthenticated";
import { Skeleton } from "~/components/ui/skeleton";

import { api } from "~/utils/api";
import { useDelay } from "~/hooks/useDelay";

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
  prompt: z.string({}).min(10, {
    message: "Prompt is required",
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
});

export default function Generate() {
  const { status } = useSession();
  const delay = useDelay(1000);
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const { mutate, isPending } = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      console.log("done", data);
      setImageUrl(data.imageUrl);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  if (status === "loading" || delay)
    return (
      <div className="grid h-full place-items-center">
        <div className="my-auto w-[800px] bg-gray-100 bg-opacity-5 p-4 backdrop-blur">
          <div className="space-y-12">
            <div className="space-y-2">
              <Skeleton className="h-3 w-[310px]" />
              <Skeleton className="h-3 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-[180px]" />
              <div className="flex w-full justify-between space-x-3">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => (
                  <Skeleton className="h-3 w-12" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-[180px]" />
              <div className="flex w-full space-x-3">
                {[1, 1, 1].map(() => (
                  <Skeleton className="h-3 w-24" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-[180px]" />
              <div className="flex w-full space-x-3">
                {[1, 1, 1].map(() => (
                  <Skeleton className="h-3 w-28" />
                ))}
              </div>
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
        {imageUrl ? <img src={imageUrl} /> : null}
      </div>
    </>
  );
}
