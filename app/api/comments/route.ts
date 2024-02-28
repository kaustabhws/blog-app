import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();

    const comment = await prisma.comment.create({
      data: { 
        description: body.data.description,
        postSlug: body.postSlug,
        userEmail: session.user.email },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
