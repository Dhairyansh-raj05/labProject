import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/games/:id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const game = await prisma.game.findUnique({ where: { id } });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error("GET /api/games/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch game" }, { status: 500 });
  }
}

// PUT /api/games/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const game = await prisma.game.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(game);
  } catch (error) {
    console.error("PUT /api/games/[id] error:", error);
    return NextResponse.json({ error: "Failed to update game" }, { status: 500 });
  }
}

// DELETE /api/games/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.game.delete({ where: { id } });
    return NextResponse.json({ message: "Game deleted" });
  } catch (error) {
    console.error("DELETE /api/games/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete game" }, { status: 500 });
  }
}
