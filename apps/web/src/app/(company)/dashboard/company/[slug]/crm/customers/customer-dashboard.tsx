/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState } from "react";


import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from "@nx-next-shadcn/shadcn";
import { CustomerTable } from "./customer-table";


export default function Customer() {
    interface Customer {
        Customer: string;         // Updated field
        subject: string;          // Updated field
        customerId: string;       // Updated field
        customerValue: string;     // Updated field
        customerType: string;      // Updated field
        startDate: string;         // Updated field
        endDate: string;           // Updated field
        action: string;            // Updated field
    }
    
    const [isEditingCustomer, setIsEditingCustomer] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    
    
    const [newCustomer, setNewCustomer] = useState<Customer>({
        Customer: "",
        subject: "",
        customerId: "",
        customerValue: "",
        customerType: "",
        startDate: "",
        endDate: "",
        action: "",
    });
    
    const addCustomer = () => {
        if (!newCustomer.Customer || !newCustomer.subject) {
            console.error("Required fields are missing");
            return;
        }
    
        // Add the new customer campaign to the campaign list
        setCustomers([...customers, newCustomer]);
    
        // Reset the form
        setNewCustomer({
            Customer: "",
            subject: "",
            customerId: "",
            customerValue: "",
            customerType: "",
            startDate: "",
            endDate: "",
            action: "",
        });
    
        // Close the dialog
        setIsEditingCustomer(false);
    };
    
    


  return (
    <div className="container mx-auto p-4">
  <div>
    <div className="flex justify-end"> 
      <Dialog open={isEditingCustomer} onOpenChange={setIsEditingCustomer}>
        <DialogTrigger asChild>
          <Button>Add Customer</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter the details for the new customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                Customer
              </Label>
              <Input
                id="customer"
                value={newCustomer.Customer}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, Customer: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                value={newCustomer.subject}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, subject: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerId" className="text-right">
                Customer ID
              </Label>
              <Input
                id="customerId"
                value={newCustomer.customerId}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, customerId: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerValue" className="text-right">
                Customer Value
              </Label>
              <Input
                id="customerValue"
                value={newCustomer.customerValue}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, customerValue: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerType" className="text-right">
                Customer Type
              </Label>
              <Input
                id="customerType"
                value={newCustomer.customerType}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, customerType: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={newCustomer.startDate}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, startDate: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={newCustomer.endDate}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, endDate: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="action" className="text-right">
                Action
              </Label>
              <Input
                id="action"
                value={newCustomer.action}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, action: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={addCustomer}>Add Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
  
  <CustomerTable />
</div>

  );
};