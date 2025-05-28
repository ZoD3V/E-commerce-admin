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

    const {
      name,
      categoryId,
      sizeId,
      status,
      isFeatured,
      colorId,
      image,
      price,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    if (!image || !image.length) {
      return new NextResponse("Image id is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color product is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const product = await prismadb.product.create({
      data: {
        name,
        categoryId,
        sizeId,
        status,
        colorId,
        price,
        isFeatured,
        image: {
          createMany: {
            data: [...image.map((image: { url: string }) => image)],
          },
        },
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("categoryId") || undefined;

    const sizeId = searchParams.get("sizeId") || undefined;

    const colorId = searchParams.get("colorId") || undefined;

    const status = searchParams.get("status") || undefined;

    const isFeatured = searchParams.get("isFeatured") || undefined;

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const product = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        status: status ? true : undefined,
      },
      include: {
        size: true,
        category: true,
        color: true,
        image: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
