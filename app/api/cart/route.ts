import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/cart?userId=
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
        game: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(cartItems);
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

// POST /api/cart — add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, productId, gameId, quantity } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    if (!productId && !gameId) {
      return NextResponse.json({ error: "Either productId or gameId is required" }, { status: 400 });
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        ...(productId ? { productId } : { gameId }),
      },
    });

    if (existingItem) {
      const updated = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + (quantity || 1) },
        include: { product: true, game: true },
      });
      return NextResponse.json(updated);
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        userId,
        productId: productId || null,
        gameId: gameId || null,
        quantity: quantity || 1,
      },
      include: { product: true, game: true },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

// DELETE /api/cart — remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartItemId } = body;

    if (!cartItemId) {
      return NextResponse.json({ error: "cartItemId is required" }, { status: 400 });
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });

    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 });
  }
}
