import prismadb from "@/lib/prismadb";

export const getTotalProduct = async (storeId: string) => {
  const countProduct = await prismadb.product.count({
    where: {
      storeId,
    },
  });

  return countProduct;
};
