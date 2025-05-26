"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ColorColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface ColorClientProps {
  data: ColorColumn[];
}

const ColorClient = ({ data }: ColorClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Color (${data.length})`} description="Manage color" />
        <Button onClick={() => router.push(`/${params.storeId}/color/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for color" />

      <Separator />

      <ApiList entityName="color" entityData="colorId" />
    </>
  );
};

export default ColorClient;
