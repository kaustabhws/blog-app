import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;

  const catParam = searchParams.get("category");

  const POST_PER_PAGE = 5;

  const query = {
    where: {
      ...(catParam && { catSlug: catParam }),
    },
  };

  try {
    let posts;
    let count;

    if (pageParam === "all") {
      posts = await prisma.post.findMany(query);
      count = posts.length;
    } else {
      const skip = POST_PER_PAGE * (page - 1);
      posts = await prisma.post.findMany({
        ...query,
        take: POST_PER_PAGE,
        skip: skip,
      });
      count = await prisma.post.count({ where: query.where });
    }

    return NextResponse.json({ success: true, data: posts, count: count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();

    const post = await prisma.post.create({
      data: { 
        title: body.title,
        slug: body.slug,
        catSlug: body.catSlug,
        image: body.media,
        description: body.description,
        userEmail: session.user.email },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
