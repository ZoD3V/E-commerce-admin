"use client";
import { useParams } from "next/navigation";
import React from "react";
import { ApiAlert } from "./api-alert";
import { UseOrigin } from "@/hooks/use-origin";

interface ApiListProps {
  entityName: string;
  entityData: string;
}

const ApiList = ({ entityName, entityData }: ApiListProps) => {
  const params = useParams();
  const origin = UseOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/${entityData}`}
      />

      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
    </>
  );
};

export default ApiList;
