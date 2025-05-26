import prismadb from "@/lib/prismadb";
import React from "react";
import ProductForm from "../components/product-form";

const AddProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      image: true,
    },
  });

  const category = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const size = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const color = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
        <ProductForm
          initialData={product}
          categoryData={category}
          sizeData={size}
          colorData={color}
        />
      </div>
    </div>
  );
};

export default AddProductPage;
