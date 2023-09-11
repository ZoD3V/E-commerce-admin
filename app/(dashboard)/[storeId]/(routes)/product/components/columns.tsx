"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import StatusAction from "./status-action"
import BattlePassAction from "./battlePass-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name: string
  product_code: string
  isBattlePass: boolean
  status: boolean
  category: string
  game: string
  price:string
  createdAt: string
  categoryId:string
  gameId:string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "product_code",
    header: "Product Code",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "game",
    header: "Game",
  },
    {
    accessorKey: "price",
    header: "Price",
  },
    {
    accessorKey: "isBattlePass",
    header: "Battle Pass",
    cell:({row})=> <BattlePassAction data={row.original}/>
  },
      {
    accessorKey: "status",
    header: "Status",
    cell:({row})=> <StatusAction data={row.original}/>
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell:({row})=> <CellAction data={row.original}/>
  },
]
