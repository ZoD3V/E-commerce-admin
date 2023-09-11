import prismadb from '@/lib/prismadb'
import React from 'react'
import CategoryForm from '../components/category-form'

const AddProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  const category = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const game = await prismadb.game.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={product} categoryData={category} gameData={game}/>
      </div>
    </div>
  );
};

export default AddProductPage