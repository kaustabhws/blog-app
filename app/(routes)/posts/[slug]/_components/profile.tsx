import Image from "next/image";
import prisma from "@/utils/connect";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  email: string;
  date: any;
  className: string;
}

const formatDate = (dateString: Date) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

const getUser = async (email: string) => {
  const res = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  return res;
};

const UserProfile: React.FC<UserProfileProps> = async ({
  email,
  date,
  className,
}) => {
  const data = await getUser(email);

  return (
    <div
      className={cn("flex items-center gap-2", className)}
    >
      <Image
        className="w-10 h-10 rounded-full"
        src={
          data?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        }
        height={20}
        width={20}
        alt="user avatar"
        priority
      />
      <div className="text-sm">
        <p className="dark:text-gray-400 text-gray-600">{data?.name}</p>
        <span className="dark:text-gray-400 text-gray-600">
          {formatDate(date)}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
