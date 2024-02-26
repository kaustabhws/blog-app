import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {

    const post = await prisma.post.findUnique({
        where: {
            slug: slug
        }
    })

    return NextResponse.json(post, { status: 200 });

  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
