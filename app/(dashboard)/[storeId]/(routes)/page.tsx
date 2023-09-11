import { getGraph } from "@/app/actions/get-graph";
import { getTotalProduct } from "@/app/actions/get-total-product";
import { getTotalRevenue } from "@/app/actions/get-total-revenue";
import Overview from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { CreditCard, DollarSign, Package } from "lucide-react";

interface DashboardPageProps{
  params:{storeId:string}
}

const DashboardPage = async({params}:DashboardPageProps) => {

  const totalRevenue:number = await getTotalRevenue(params.storeId)
  const countproduct:number = await getTotalProduct(params.storeId)
  const graphRevenue = await getGraph(params.storeId)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashbord" description="Overview of your store" />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {`Rp ${Math.floor(totalRevenue).toLocaleString('id-ID')}`}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sales
              </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +25
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Product
              </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {countproduct}
              </div> 
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
