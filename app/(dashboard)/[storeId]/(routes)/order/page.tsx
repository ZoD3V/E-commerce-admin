import React from "react";
import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import OrderClient from "./components/client";
import { getOrderByStoreJoinProduct } from "@prisma/client/sql";

const OrderPage = async ({ params }: { params: { storeId: string } }) => {
  const order = await prismadb.$queryRawTyped(
    getOrderByStoreJoinProduct(params.storeId)
  );

  const formattedOrder: OrderColumn[] = order.map((item) => ({
    phone: item.phone,
    product: item.product,
    amount: `Rp ${Math.floor(item.amount.toNumber()).toLocaleString("id-ID")}`,
    transaction_code: item.transaction_code,
    status: item.status,
    createdAt: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
        <OrderClient data={formattedOrder} />
      </div>
    </div>
  );
};

export default OrderPage;
