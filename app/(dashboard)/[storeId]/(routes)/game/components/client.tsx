"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@radix-ui/react-separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { GameColumn, columns } from './columns'
import ApiList from '@/components/ui/api-list'

interface GameClientProps{
  data:GameColumn[]
}

const GameClient = ({data}:GameClientProps) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Game (${data.length})`} description="Manage game" />
        <Button
        onClick={()=> router.push(`/${params.storeId}/game/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator/>
      <DataTable searchKey='name' columns={columns} data={data}/>
      <Heading title="API" description="API calls for game"/>

      <Separator/>

      <ApiList entityName="game" entityData="gameId"/>
    </>
  );
}

export default GameClient