import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const formatDate = (dateString: Date) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface BlogCardProps {
  item: any;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = async ({ item, className }) => {
  return (
    <div className={cn("flex mt-5 items-center gap-6", className)} key={item.id}>
      <div className="flex-1 max-[740px]:w-full">
        <Image
          src={item.image}
          width={300}
          height={300}
          alt={item.slug}
          className="w-full h-full object-cover rounded-sm"
          priority
          unoptimized
        />
      </div>
      <div className="flex-1 max-[740px]:w-full">
        <div className="flex flex-col gap-3">
          <p className="text-xs dark:text-gray-400">
            {formatDate(item.createdAt)} -{" "}
            <span className="uppercase text-red-400">{item.catSlug}</span>
          </p>
          <h1 className="text-xl font-semibold">{item.title}</h1>
          <p className="dark:text-gray-300">{item.description.slice(0,150)}...</p>
          <Link href={`/posts/${item.slug}`}>
            <Button variant="link" className="w-max p-0">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
