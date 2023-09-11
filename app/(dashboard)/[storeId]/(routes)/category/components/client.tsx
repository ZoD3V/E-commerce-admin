"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Banner } from '@prisma/client'
import { Separator } from '@radix-ui/react-separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { CategoryColumn, columns } from './columns'
import ApiList from '@/components/ui/api-list'

interface CategoryClientProps{
  data:CategoryColumn[]
}

const CategoryClient = ({data}:CategoryClientProps) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Category (${data.length})`} description="Manage category" />
        <Button
        onClick={()=> router.push(`/${params.storeId}/category/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator/>
      <DataTable searchKey='name' columns={columns} data={data}/>
      <Heading title="API" description="API calls for category"/>

      <Separator/>

      <ApiList entityName="category" entityData="categoryId"/>
    </>
  );
}

export default CategoryClient