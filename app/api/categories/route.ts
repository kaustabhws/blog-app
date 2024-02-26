import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function GET() {
    try {
        const categories = await prisma.category.findMany()

        return NextResponse.json({success: true, data: categories}, {status: 200})

    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
}