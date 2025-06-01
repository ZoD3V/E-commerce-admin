import prismadb from "@/lib/prismadb";
import React from "react";
import ColorForm from "../components/color-form";
import { getColorByColorId } from "@prisma/client/sql";

const AddColorPage = async ({ params }: { params: { colorId: string } }) => {
  const [color] = await prismadb.$queryRawTyped(
    getColorByColorId(params.colorId)
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default AddColorPage;
