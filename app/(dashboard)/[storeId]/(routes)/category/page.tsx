import React from "react";
import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";
import CategoryClient from "./components/client";
import { getCategoryByStoreId } from "@prisma/client/sql";

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
  const category = await prismadb.$queryRawTyped(
    getCategoryByStoreId(params.storeId)
  );

  const formattedCategory: CategoryColumn[] = category.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
        <CategoryClient data={formattedCategory} />
      </div>
    </div>
  );
};

export default CategoryPage;
