import BlogsPage from "./blogs";
import CategoryPage from "./categories";
import FeaturedPage from "./featured";

const BlogPage = ({ page }: { page: number }) => {
  return (
    <div>
      <FeaturedPage />
      <CategoryPage />
      <BlogsPage page={page} />
    </div>
  );
};

export default BlogPage;
