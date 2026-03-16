import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/search?q= — search products & games
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q || q.trim().length === 0) {
      return NextResponse.json({ products: [], games: [] });
    }

    const [products, games] = await Promise.all([
      prisma.product.findMany({
        where: {
          name: { contains: q },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.game.findMany({
        where: {
          title: { contains: q },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({ products, games });
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
