import PopularPage from "@/components/blogpages/popular";
import Comment from "@/components/comment";
import axios from "axios";
import Image from "next/image";
import UserProfile from "../../../../components/_components/profile";
import ErrorPage from "../../../../components/_components/error";
import prisma from "@/utils/connect";

interface PostParams {
  slug: string;
}

const getData = async (slug: string) => {
  const base = process.env.NEXTAUTH_URL;
  const res = await axios.get(`${base}/api/posts/${slug}`);

  if (res.statusText != "OK") {
    console.log("Error fetching data");
  }

  return res.data;
};

const PostPage = async ({ params }: { params: PostParams }) => {
  const data = await getData(params.slug);
  if (!data) {
    return <ErrorPage />;
  }

  return (
    <div className="my-6 md:w-9/12 mx-auto w-11/12 flex flex-col">
      <div className="flex items-center max-[712px]:flex-col max-[712px]:gap-6">
        <div className="flex-1 flex max-[712px]:text-center flex-col gap-10">
          <h1 className="text-4xl font-semibold">{data?.title}</h1>
          <UserProfile
            email={data?.userEmail}
            date={data?.createdAt}
            className="max-[712px]:hidden"
          />
        </div>
        <div className="flex-1 flex justify-center">
          {data?.image && (
            <Image
              src={data?.image}
              alt="image"
              height={500}
              width={500}
              className="w-full h-96 object-cover rounded-lg"
              priority
              unoptimized
            />
          )}
        </div>
      </div>
      <div className="ml-auto mt-7">
        <UserProfile
          email={data?.userEmail}
          date={data?.createdAt}
          className="min-[712px]:hidden"
        />
      </div>
      <div className="mt-6 flex gap-3 max-[1034px]:flex-col">
        <div className="flex-[2.5]">
          <div
            dangerouslySetInnerHTML={{ __html: data?.description }}
            className="description"
          />
          <div className="mt-10">
            <Comment postSlug={params.slug} />
          </div>
        </div>
        <div className="flex-1">
          <PopularPage />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
