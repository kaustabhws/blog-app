"use client";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const FormSchema = z.object({
  description: z.string().min(5),
});

const fetcher = async (url: any) => {
  const res = await axios.get(url);

  if (res.statusText != "OK") {
    console.log("Error fetching data");
  }

  return res.data;
};

const formatDate = (dateString: Date) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

const Comment = ({ postSlug }: { postSlug: any }) => {
  const { status } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data, mutate, isLoading } = useSWR(
    `/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await axios.post("/api/comments", { data, postSlug });
    if (res.status != 200) {
      toast.error("Something went wrong");
      console.log("Error fetching data");
    } else {
      toast.success("Comment added successfully!");
      mutate();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="dark:text-gray-400 text-gray-600 text-2xl font-semibold">
        Comments
      </h1>
      {status === "authenticated" ? (
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="w-3/4 resize-none max-[712px]:w-full"
                      placeholder="Write a comment"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="outline" className="w-max">
              Submit
            </Button>
          </form>
        </Form>
      ) : (
        <p className="text-gray-400">Login to write a comment</p>
      )}
      <div className="mt-6">
        <h1 className="text-lg font-semibold">Comments</h1>
        <div className="flex flex-col gap-10 mt-5">
          {isLoading
            ? "Loading comments..."
            : data?.map((comment: any) => (
                <div className="flex flex-col gap-3" key={comment.id}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={comment?.user?.image}
                      width={30}
                      height={30}
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col text-sm">
                      <p>{comment?.user?.name}</p>
                      <p>{formatDate(comment?.createdAt)}</p>
                    </div>
                  </div>
                  <div>
                    <p>{comment?.description}</p>
                  </div>
                </div>
              ))}
          {data?.length === 0 && <p>No comments yet...</p>}
        </div>
      </div>
    </div>
  );
};

export default Comment;
