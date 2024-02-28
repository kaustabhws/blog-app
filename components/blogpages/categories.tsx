import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {

  const base = process.env.NEXTAUTH_URL
  const res = await axios.get(`${base}/api/categories`);

  if (!res.data.success) {
    console.log("Error fetching data");
  }

  return res.data.data;
};

const CategoryPage = async () => {
  const data = await getData();
  return (
    <div className="md:w-9/12 mx-auto mt-8 w-11/12">
      <div>
        <h1 className="text-2xl font-semibold">Popular Categories</h1>
        <div className="">
          <div className="mt-5 flex items-center justify-center gap-7 flex-wrap">
            {data?.map((item: any, index: number) => (
              <Link href={`/blog?category=${item.slug}`} key={index}>
              <div
                className="border w-max px-6 py-2 rounded-lg cursor-pointer flex items-center gap-2 hover:bg-accent hover:text-accent-foreground"
              >
                <Image
                  src={item?.image}
                  width={40}
                  height={40}
                  alt="Travel"
                  className="h-10 w-10 object-cover"
                />
                <p>{item?.title}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
