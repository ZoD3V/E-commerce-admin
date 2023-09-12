import prismadb from "@/lib/prismadb";

interface GraphData {
  name:string,
  total:number
}

export const getGraph = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
    },
    include: {
      product: true,
    },
  });

  const monthRevenue: { [key: number]: number } = {};
  let revenueOrder = 0;

  for (let order of paidOrders) {
    const month = order.createdAt.getMonth();
    revenueOrder += order.product.price.toNumber();

    monthRevenue[month] = (monthRevenue[month] || 0) + revenueOrder
  }

  const graphData:GraphData[] = [
    {name:"Jan" ,total:0},
    {name:"Feb" ,total:0},
    {name:"March" ,total:0},
    {name:"Apr" ,total:0},
    {name:"Mei" ,total:0},
    {name:"June" ,total:0},
    {name:"Jul" ,total:0},
    {name:"Augs" ,total:0},
    {name:"Sep" ,total:0},
    {name:"Oct" ,total:0},
    {name:"Nov" ,total:0},
    {name:"Desc" ,total:0},
  ]

  for(const month in monthRevenue){
    graphData[parseInt(month)].total = monthRevenue[parseInt(month)]
  }

  return graphData;
};
