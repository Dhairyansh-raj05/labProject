import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/products — list all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const condition = searchParams.get("condition");

    const where: Record<string, unknown> = {};

    if (search) {
      where.name = { contains: search };
    }
    if (category) {
      where.category = category;
    }
    if (condition) {
      where.condition = condition;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products — create a product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, currentPrice, originalPrice, condition, imageUrl, statusText, statusIcon, category, description } = body;

    if (!name || currentPrice == null || originalPrice == null || !condition || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        currentPrice,
        originalPrice,
        condition,
        imageUrl,
        statusText: statusText || "",
        statusIcon: statusIcon || "",
        category: category || "console",
        description,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
