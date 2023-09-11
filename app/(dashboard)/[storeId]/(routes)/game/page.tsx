import React from 'react'
import prismadb from '@/lib/prismadb'
import { GameColumn } from './components/columns'
import { format } from "date-fns";
import GameClient from './components/client';

const GamePage = async({params}:{params:{storeId:string}}) => {
  const game = await prismadb.game.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      category:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  const formattedGame: GameColumn[] = game.map((item) => ({
    id: item.id,
    name: item.name,
    dev: item.name_dev,
    desc: item.desc,
    imgUrl:item.imgUrl,
    category:item.category.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));


  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
         <GameClient data={formattedGame}/>
      </div>
    </div>
  )
}

export default GamePage