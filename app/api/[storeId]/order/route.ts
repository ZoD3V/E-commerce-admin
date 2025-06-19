import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.order.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const order = await prismadb.order.create({
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
    console.log("[ORDER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const order = await prismadb.order.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
