import React from "react";
import BannerClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { BannerColumn } from "./components/columns";
import { format } from "date-fns";
import { getBannerByStoreId } from "@prisma/client/sql";

const BannerPage = async ({ params }: { params: { storeId: string } }) => {
  const banner = await prismadb.$queryRawTyped(
    getBannerByStoreId(params.storeId)
  );

  const formattedBillboards: BannerColumn[] = banner.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
        <BannerClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BannerPage;
