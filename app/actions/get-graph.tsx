import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraph = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthRevenue: { [key: number]: number } = {};
  let revenueOrder = 0;

  for (let order of paidOrders) {
    const month = order.createdAt.getMonth();
    revenueOrder += order.orderItems.reduce((total, item) => {
      return total + Number(item.product.price);
    }, 0);

    monthRevenue[month] = (monthRevenue[month] || 0) + revenueOrder;
  }

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Desc", total: 0 },
  ];

  for (const month in monthRevenue) {
    graphData[parseInt(month)].total = monthRevenue[parseInt(month)];
  }

  return graphData;
};
