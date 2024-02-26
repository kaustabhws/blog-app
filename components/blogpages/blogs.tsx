import axios from "axios";
import BlogCard from "./blog-card";
import PaginationBlog from "../pagination-blog";
import PopularPage from "./popular";

const getData = async (page: number) => {
  const base = process.env.NEXTAUTH_URL
  const res = await axios.get(`${base}/api/posts?page=${page}`);

  if (!res.data.success) {
    console.log("Error fetching data");
  }

  return res.data;
};

const BlogsPage = async ({ page }: { page: number }) => {
  const data = await getData(page);

  const POST_PER_PAGE = 5;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < data.count;

  return (
    <div className="md:w-9/12 mx-auto my-16 w-11/12">
      <div className="flex gap-2 max-[740px]:flex-col">
        <div className="flex-[2.5]">
          <h1 className="text-2xl font-semibold">Recent Posts</h1>
          <div className="flex flex-col">
          {data.data.map((item: any, index: number) => (
              <BlogCard key={index} item={item} className="max-[1080px]:flex-col max-[1080px]:items-start max-[740px]:items-center" />
          ))}
          </div>
          <PaginationBlog page={page} hasPrev={hasPrev} hasNext={hasNext} />
        </div>
        <div className="flex-1">
            <PopularPage />
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
