import BlogPage from "@/components/blogpages/main";
import FooterPage from "@/components/footer";
import Image from "next/image";

interface SearchParams {
  page: string;
}

export default function Home(
  { searchParams }: { searchParams: SearchParams }) {

  const page = parseInt(searchParams.page) || 1;

  return (
    <div>
      <BlogPage page={page} />
      <FooterPage />
    </div>
  );
}
