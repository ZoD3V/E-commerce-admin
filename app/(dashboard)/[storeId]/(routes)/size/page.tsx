import React from "react";
import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";
import SizeClient from "./components/client";

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const size = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSize: SizeColumn[] = size.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
        <SizeClient data={formattedSize} />
      </div>
    </div>
  );
};

export default SizePage;
