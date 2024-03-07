import axios from "axios";
import Link from "next/link";

const getData = async () => {
  const base = process.env.NEXTAUTH_URL;
  const res = await axios.get(`${base}/api/posts`);

  if (!res.data.success) {
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

const PopularPage = async () => {
  const data = await getData();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Most Popular</h1>
      <div className="mt-5 flex flex-col gap-6">
        {data?.data?.reverse().slice(0, 5).map((item: any, index: number) => (
          <div className="flex flex-col gap-2" key={index}>
            <div className="text-sm bg-red-400 w-max px-2 rounded-2xl capitalize">
              {item?.catSlug}
            </div>
            <Link href={`/posts/${item.slug}`}>
              <div>{item?.title}</div>
            </Link>
            <div className="dark:text-gray-400 text-sm">
              {item?.user?.name} - {formatDate(item?.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPage;
