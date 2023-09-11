import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
const midtransClient = require("midtrans-client");

export async function POST(
  req: Request,
) {
  try{
    const body = await req.json();
    let apiClient = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER,
      clientKey: process.env.MIDTRANS_CLIENT,
    });

    const statusResponse = await apiClient.transaction.notification(body);
    const transaction_code:string = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;
    console.log(`Transaction notification received. Order ID: ${transaction_code}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

    let status = "";

    if (transactionStatus == 'capture') {
      // capture only applies to card transaction, which you need to check for the fraudStatus
      if (fraudStatus == 'challenge') {
        status = "challenge";
      } else if (fraudStatus == 'accept') {
        status = "success";
      }
    } else if (transactionStatus == 'settlement') {
      status = "success";
    } else if (transactionStatus == 'deny') {
      status = "pending";
      // and later can become success
    } else if (transactionStatus == 'cancel' || transactionStatus == 'expire') {
      status = "failure";
    } else if (transactionStatus == 'pending') {
      status = "pending";
    }

    await prismadb.order.update({
      where: {
        transaction_code: transaction_code,
      },
      data: {
        status,
      },
    });
  }catch(error){
    return new NextResponse("Internal error", { status: 500 });
  }
}