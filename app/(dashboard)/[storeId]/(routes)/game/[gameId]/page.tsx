import prismadb from '@/lib/prismadb'
import React from 'react'
import GameForm from '../components/game-form'

const AddGamePage = async({params}:{params:{gameId:string,storeId:string}}) => {
  const game = await prismadb.game.findUnique({
    where:{
      id:params.gameId
    }
  })

  const category = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    }
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <GameForm initialData={game} categoryData={category}/>
      </div>
    </div>
  )
}

export default AddGamePage