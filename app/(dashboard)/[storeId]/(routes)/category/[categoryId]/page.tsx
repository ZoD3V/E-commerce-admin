import prismadb from "@/lib/prismadb";
import React from "react";
import CategoryForm from "../components/category-form";
import { getCategoryByCategoryId } from "@prisma/client/sql";

const AddCategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const [category] = await prismadb.$queryRawTyped(
    getCategoryByCategoryId(params.categoryId)
  );

  const banner = await prismadb.banner.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
        <CategoryForm initialData={category} bannerData={banner} />
      </div>
    </div>
  );
};

export default AddCategoryPage;
