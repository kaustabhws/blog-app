import Image from "next/image";
import { Button } from "../ui/button";
import axios from "axios";
import Link from "next/link";

const FeaturedPage = async () => {
  return (
    <div className="md:w-9/12 mx-auto mt-5 w-11/12">
      <div className="flex flex-col">
        <div>
          <h1 className="text-center text-5xl dark:text-gray-300 max-[400px]:text-4xl max-[275px]:text-2xl">
            <span className="font-semibold">Hey, Kaustabh here!</span> Discover
            new stories and creative ideas
          </h1>
        </div>
        <div className="flex mt-5 items-center gap-6 flex-col md:flex-row">
          <div className="flex-1">
            <Image
              src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={300}
              height={300}
              alt="Image"
              className="w-full h-full object-cover rounded-sm"
              unoptimized
              priority
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-3">
              <h1 className="text-xl font-semibold">
              Welcome to BLOG: Your Gateway to Inspiration and Knowledge
              </h1>
              <p
                className="dark:text-gray-300">
                  Discover captivating content, engage with our community, and explore new ideas on BLOG. Join us on a journey of inspiration and knowledge sharing. Start exploring today!
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;
