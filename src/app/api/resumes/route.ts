import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Find the user's resume
    const resume = await db.resume.findFirst({
      where: { userId },
    });

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching resume" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, template, personalInfo, experience, education, skills } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if resume already exists for this user
    const existingResume = await db.resume.findFirst({
      where: { userId },
    });

    let resume;

    if (existingResume) {
      // Update existing resume
      resume = await db.resume.update({
        where: { id: existingResume.id },
        data: {
          template,
          personalInfo,
          experience,
          education,
          skills,
        },
      });
    } else {
      // Create new resume
      resume = await db.resume.create({
        data: {
          userId,
          template,
          personalInfo,
          experience,
          education,
          skills,
        },
      });
    }

    return NextResponse.json({
      message: "Resume saved successfully",
      resume,
    });
  } catch (error) {
    console.error("Error saving resume:", error);
    return NextResponse.json(
      { error: "An error occurred while saving resume" },
      { status: 500 }
    );
  }
}