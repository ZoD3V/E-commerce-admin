"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Banner } from '@prisma/client'
import { Separator } from '@radix-ui/react-separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ProductColumn, columns } from './columns'
import ApiList from '@/components/ui/api-list'

interface ProductClientProps{
  data:ProductColumn[]
}

const ProductClient = ({data}:ProductClientProps) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Product (${data.length})`} description="Manage product" />
        <Button
        onClick={()=> router.push(`/${params.storeId}/product/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator/>
      <DataTable searchKey='name' columns={columns} data={data}/>
      <Heading title="API" description="API calls for product"/>

      <Separator/>

      <ApiList entityName="product" entityData="productId"/>
    </>
  );
}

export default ProductClient