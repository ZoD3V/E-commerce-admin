import React from 'react'
import prismadb from '@/lib/prismadb'
import { ProductColumn } from './components/columns'
import { format } from "date-fns";
import {formatter} from  "@/lib/utils"
import ProductClient from './components/client';

const ProductPage = async({params}:{params:{storeId:string}}) => {
  const product = await prismadb.product.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      category:true,
      game:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  
  const formattedProduct: ProductColumn[] = product.map((item) => ({
    id: item.id,
    name: item.name,
    product_code:item.product_code,
    isBattlePass:item.isBattlePass,
    price: `Rp ${Math.floor(item.price.toNumber()).toLocaleString('id-ID')}`,
    category:item.category.name,
    game:item.game.name,
    status:item.status,
    categoryId:item.categoryId,
    gameId:item.gameId,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }));


  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
         <ProductClient data={formattedProduct}/>
      </div>
    </div>
  )
}

export default ProductPage