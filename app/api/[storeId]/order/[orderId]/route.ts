import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const order = await prismadb.order.findUnique({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string; storeId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.orderId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const order = await prismadb.order.deleteMany({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[BANNER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string; storeId: string } }
) {
  try {
    const { userId } = await auth();

    const body = await req.json();

    const { phone, productId, sizeId, amount, status, transaction_code } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!phone) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!productId) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!status) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!transaction_code) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!params.orderId) {
      return new NextResponse("banner id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const order = await prismadb.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        phone,
        productId,
        sizeId,
        amount,
        status,
        transaction_code,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
