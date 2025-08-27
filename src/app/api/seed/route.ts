import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Check if test user already exists
    const existingUser = await db.user.findUnique({
      where: { email: "test@example.com" },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "Test user already exists",
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    }

    // Create test user
    const hashedPassword = await bcrypt.hash("password123", 12);
    const user = await db.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Test user created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      loginCredentials: {
        email: "test@example.com",
        password: "password123",
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating test user" },
      { status: 500 }
    );
  }
}