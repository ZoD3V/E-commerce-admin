"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@radix-ui/react-separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BannerColumn, columns } from './columns'
import ApiList from '@/components/ui/api-list'

interface BannerClientProps{
  data:BannerColumn[]
}

const BannerClient = ({data}:BannerClientProps) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Banner (${data.length})`} description="Manage Banner" />
        <Button
        onClick={()=> router.push(`/${params.storeId}/banner/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator/>
      <DataTable searchKey='label' columns={columns} data={data}/>
{}
      <Heading title="API" description="API calls for banner"/>

      <Separator/>

      <ApiList entityName="banner" entityData="bannerId"/>
    </>
  );
}

export default BannerClient