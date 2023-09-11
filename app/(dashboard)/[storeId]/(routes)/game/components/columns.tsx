"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type GameColumn = {
  id: string;
  name: string;
  category: string;
  dev: string;
  desc: string;
  imgUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<GameColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category,
  },
  {
    accessorKey: "dev",
    header: "Dev",
  },
  {
    accessorKey: "desc",
    header: "Desc",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
