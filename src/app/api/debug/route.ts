import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Get all users
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // Get all resumes
    const resumes = await db.resume.findMany({
      select: {
        id: true,
        userId: true,
        template: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      users,
      resumes,
      userCount: users.length,
      resumeCount: resumes.length,
    });
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    );
  }
}