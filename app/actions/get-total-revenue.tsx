import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      status: "success",
    },
    include: {
      product: true,
    },
  });
  const totalRevenue = paidOrders.reduce((total, order) => {
    return (total + order.product.price.toNumber());
  }, 0);

  return totalRevenue;
};
