import React from 'react'
import BannerClient from './components/client'
import prismadb from '@/lib/prismadb'
import {  OrderColumn } from './components/columns'
import { format } from "date-fns";

const OrderPage = async({params}:{params:{storeId:string}}) => {
  const order = await prismadb.order.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      product:true,
    },
    orderBy:{
      createdAt:"desc"
    }
  })

    const formattedOrder: OrderColumn[] = order.map((item) => ({
    id: item.id,
    sizeId: item.sizeId,
    phone: item.phone,
    product:item.product.name,
    amount:`Rp ${Math.floor(item.amount.toNumber()).toLocaleString('id-ID')}`,
    transaction_code:item.transaction_code,
    status:item.status,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));


  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
         <BannerClient data={formattedOrder}/>
      </div>
    </div>
  )
}

export default OrderPage