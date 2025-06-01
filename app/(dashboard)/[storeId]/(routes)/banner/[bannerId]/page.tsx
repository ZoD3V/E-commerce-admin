import prismadb from "@/lib/prismadb";
import React from "react";
import BannerForm from "../components/banner-form";
import { getBannerByBannerId } from "@prisma/client/sql";

const AddBannerPage = async ({ params }: { params: { bannerId: string } }) => {
  const [banner] = await prismadb.$queryRawTyped(
    getBannerByBannerId(params.bannerId)
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
        <BannerForm initialData={banner} />
      </div>
    </div>
  );
};

export default AddBannerPage;
