import { Button, Table, TableBody, TableHead, TableHeader, TableRow } from "@nx-next-shadcn/shadcn";
import SalesChartTableRow from "./SalesChartTableRow";
import CustomerPhoto from "./customer_photo.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const SalesChartTable = () => {
  const tableData = [
    {id: 1, customerName: "Customer Name", email: "customer@gmail.com", photo: CustomerPhoto, productName: "Product 01", sales: 540, recordPoints: 4, stock: 4, amount: 25000, inStock: true},
    {id: 2, customerName: "Customer Name", email: "customer@gmail.com", photo: CustomerPhoto, productName: "Product 01", sales: 540, recordPoints: 4, stock: 4, amount: 25000, inStock: true},
    {id: 3, customerName: "Customer Name", email: "customer@gmail.com", photo: CustomerPhoto, productName: "Product 01", sales: 540, recordPoints: 4, stock: 4, amount: 25000, inStock: true},
    {id: 4, customerName: "Customer Name", email: "customer@gmail.com", photo: CustomerPhoto, productName: "Product 01", sales: 540, recordPoints: 4, stock: 4, amount: 25000, inStock: false},
    {id: 5, customerName: "Customer Name", email: "customer@gmail.com", photo: CustomerPhoto, productName: "Product 01", sales: 540, recordPoints: 4, stock: 4, amount: 25000, inStock: true},
    {id: 6, customerName: "Customer Name", email: "customer@gmail.com", photo: CustomerPhoto, productName: "Product 01", sales: 540, recordPoints: 4, stock: 4, amount: 25000, inStock: true},
    {id: 7, customerName: "Customer Name", email: "customer@gmail.com", photo: CustomerPhoto, productName: "Product 01", sales: 540, recordPoints: 4, stock: 4, amount: 25000, inStock: true},
    {id: 8, customerName: "Customer Name", email: "customer@gmail.com", photo: CustomerPhoto, productName: "Product 01", sales: 540, recordPoints: 4, stock: 4, amount: 25000, inStock: false},
  ];

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedData = tableData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <div className="mt-6 overflow-x-auto">
        <Table className="w-full min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead>Customer List</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Record Points</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Stock Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              paginatedData.map((data) => <SalesChartTableRow key={data.id} customerName={data.customerName} email={data.email} photo={data.photo} productName={data.productName} sales={data.sales} recordPoints={data.recordPoints} stock={data.stock} amount={data.amount} inStock={data.inStock} />)
            }
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

export default SalesChartTable;