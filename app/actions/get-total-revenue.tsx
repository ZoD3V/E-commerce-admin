import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      status: "success",
    },
  });
  const totalRevenue = paidOrders.reduce((total, order) => {
    return (total + order.amount.toNumber());
  }, 0);

  return totalRevenue;
};
