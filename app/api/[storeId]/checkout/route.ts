import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
const midtransClient = require("midtrans-client");
var randomstring = require("randomstring");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { name, amount, productId, address, phone } = await req.json();

  if (!amount) {
    return new NextResponse("Amount is required", { status: 400 });
  }

  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }

  if (!productId) {
    return new NextResponse("Product Id is required", { status: 400 });
  }

  if (!address) {
    return new NextResponse("address Id is required", { status: 400 });
  }

  const productIds = productId.map(
    (item: { productId: string }) => item.productId
  );

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  if (products.length !== productIds.length) {
    const missingIds = productIds.filter(
      (id: string) => !products.some((product) => product.id === id)
    );
    return new NextResponse(
      `Some products not found: ${missingIds.join(", ")}`,
      { status: 404 }
    );
  }

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      address,
      name,
      phone,
      transaction_code: randomstring.generate(7),
      orderItems: {
        create: productId.map((productId: { productId: string }) => ({
          product: {
            connect: {
              id: productId.productId,
            },
          },
        })),
      },
    },
  });

  try {
    // Create Snap API instance
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER,
      clientKey: process.env.MIDTRANS_CLIENT,
    });

    let parameter = {
      transaction_details: {
        order_id: order.transaction_code,
        gross_amount: amount,
      },
      customer_details: {
        first_name: name,
        phone: phone,
        billing_address: {
          first_name: name,
          phone: phone,
          address: address,
          country_code: "IDN",
        },
      },
      credit_card: {
        secure: true,
      },
    };

    const data = await snap.createTransaction(parameter);
    return NextResponse.json({ data }, { headers: corsHeaders });
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
