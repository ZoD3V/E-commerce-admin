"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import { OrderColumn, columns } from './columns'

interface OrderClientProps{
  data:OrderColumn[]
}

const OrderClient = ({data}:OrderClientProps) => {

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Order (${data.length})`} description="Manage Order" />
      </div>
      <Separator/>
      <DataTable searchKey='sizeId' columns={columns} data={data}/>


    </>
  );
}

export default OrderClient