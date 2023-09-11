import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name,categoryId,gameId,status,isBattlePass,price,product_code } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

        if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

        if (!gameId) {
      return new NextResponse("Game id is required", { status: 400 });
    }

        if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

      if (!product_code) {
      return new NextResponse("Code product is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        categoryId,
        gameId,
        status,
        price,
        product_code,
        isBattlePass,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {

    const {searchParams} = new URL(req.url)

    const categoryId = searchParams.get("categoryId") || undefined

    const gameId = searchParams.get("gameId") || undefined

    const isBattlePass = searchParams.get("isBattlePass") || undefined
    
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const product = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        gameId,
        isBattlePass: isBattlePass ? true : undefined
      },
      include: {
        game: true,
        category: true
      },
      orderBy:{
        createdAt:"desc"
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};