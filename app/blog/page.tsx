import BlogCard from "@/components/blogpages/blog-card";
import PaginationBlog from "@/components/pagination-blog";
import axios from "axios";

interface SearchParams {
  page: string;
  category: string;
}

const getData = async (page: number, category: string) => {
  const base = process.env.NEXTAUTH_URL;
  const res = await axios.get(
    `${base}/api/posts?page=${page}&category=${category}`
  );

  if (!res.data.success) {
    console.log("Error fetching data");
  }

  return res.data;
};

const BlogPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { category } = searchParams;

  const data = await getData(page, category);

  const POST_PER_PAGE = 5;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < data.count;

  return (
    <div className="md:w-9/12 mx-auto my-6 w-11/12">
      <div className="flex justify-center mb-10">
        <h1 className="text-center text-4xl font-semibold">
          <span className="capitalize">{category}</span> Blogs
        </h1>
      </div>
      {data.data.length === 0 && (
        <div>
          <p className='text-center text-xl'>No Blogs Found</p>
        </div>
      )}
      {data.data?.map((item: any) => (
        <BlogCard item={item} key={item._id} className="max-[500px]:flex-col" />
      ))}
      <PaginationBlog
        page={page}
        hasNext={hasNext}
        hasPrev={hasPrev}
        cat={category}
      />
    </div>
  );
};

export default BlogPage;
