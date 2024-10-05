import { Badge, TableCell, TableRow } from "@nx-next-shadcn/shadcn";
import Image from "next/image";

const SalesChartTableRow: React.FC<{
  customerName: string;
  email: string;
  photo: any;
  productName: string;
  sales: number;
  recordPoints: number;
  stock: number;
  amount: number;
  inStock: boolean;
}> = ({customerName, email, photo, productName, sales, recordPoints, stock, amount, inStock}) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex justify-start items-center gap-2">
          <Image className="w-12 h-12 rounded-full" src={photo} alt={customerName} />
          <div className="">
            <span className="block font-medium">{customerName}</span>
            <span className="block text-sm text-muted-foreground">{email}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>{productName}</TableCell>
      <TableCell>{sales}</TableCell>
      <TableCell>{recordPoints}</TableCell>
      <TableCell>{stock}</TableCell>
      <TableCell>${amount}</TableCell>
      <TableCell>
        <Badge className={`text-xs ${inStock ? 'bg-black text-white' : 'bg-muted-foreground text-white'}`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </TableCell>
    </TableRow>
  );
}

export default SalesChartTableRow;