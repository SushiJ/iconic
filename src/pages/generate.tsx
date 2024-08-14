"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const { mutate, isPending } = api.generate.generateIcon.useMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="grid h-full w-full place-items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
