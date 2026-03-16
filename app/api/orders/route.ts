import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/orders?userId=
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
            game: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST /api/orders — place an order (converts cart → order)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, address } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true, game: true },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Calculate total
    let totalPrice = 0;
    const orderItemsData = cartItems.map((item) => {
      const price = item.product
        ? item.product.currentPrice
        : item.game
        ? item.game.price
        : 0;
      totalPrice += price * item.quantity;

      return {
        quantity: item.quantity,
        price: price,
        productId: item.productId,
        gameId: item.gameId,
      };
    });

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalPrice,
          address: address || null,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: {
            include: {
              product: true,
              game: true,
            },
          },
        },
      });

      // Clear the cart
      await tx.cartItem.deleteMany({ where: { userId } });

      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
