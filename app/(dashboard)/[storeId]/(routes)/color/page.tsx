import React from "react";
import prismadb from "@/lib/prismadb";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns";
import ColorClient from "./components/client";
import { getColorByStoreId } from "@prisma/client/sql";

const ColorPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.$queryRawTyped(
    getColorByStoreId(params.storeId)
  );

  const formattedSize: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
        <ColorClient data={formattedSize} />
      </div>
    </div>
  );
};

export default ColorPage;
