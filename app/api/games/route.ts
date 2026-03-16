import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/games — list all games
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const platform = searchParams.get("platform");

    const where: Record<string, unknown> = {};

    if (search) {
      where.title = { contains: search };
    }
    if (platform) {
      where.platform = platform;
    }

    const games = await prisma.game.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(games);
  } catch (error) {
    console.error("GET /api/games error:", error);
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}

// POST /api/games — create a game
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, price, image, genre, platform } = body;

    if (!title || price == null || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const game = await prisma.game.create({
      data: { title, price, image, genre, platform },
    });

    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    console.error("POST /api/games error:", error);
    return NextResponse.json({ error: "Failed to create game" }, { status: 500 });
  }
}
