import prismadb from "@/lib/prismadb";

export const getTotalSales = async (storeId: string) => {
  const countProduct = await prismadb.order.count({
    where: {
      storeId,
      status:"success"
    },
  });

  return countProduct;
};
