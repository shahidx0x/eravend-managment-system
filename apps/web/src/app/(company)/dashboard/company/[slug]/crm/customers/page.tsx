import { CardTitle } from "@nx-next-shadcn/shadcn";
import Customer from "./customer-dashboard";

const page = () => {
  return (
    <div className="p-4">
      <CardTitle>Customers</CardTitle>
      <Customer/>
    </div>
    
  )
   
};

export default page;
