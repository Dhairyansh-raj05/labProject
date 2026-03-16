import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST /api/newsletter — subscribe
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSub.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "Already subscribed!" });
    }

    await prisma.newsletterSub.create({ data: { email } });

    return NextResponse.json({ message: "Successfully subscribed!" }, { status: 201 });
  } catch (error) {
    console.error("POST /api/newsletter error:", error);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
