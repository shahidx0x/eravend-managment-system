/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState } from "react";


import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@nx-next-shadcn/shadcn";
import { MarketingTable } from "./marketing-table";


export default function Marketing() {
  interface Campaign {
    name: string;
    type: string;
    dealValue: string;
    currency: string;
    period: string;
    periodValue: string;
    targetAudience: string;
    description: string;
  }
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  
  
  const campaignTypes = [
    { id: 1, name: "Marketing" },
    { id: 2, name: "Sales" },
    { id: 3, name: "Awareness" },
  ];
  
  const currencies = [
    { id: 1, name: "USD" },
    { id: 2, name: "EUR" },
    { id: 3, name: "GBP" },
  ];
  
  const targetAudiences = [
    { id: 1, name: "Small Business" },
    { id: 2, name: "Corporate Companies" },
    { id: 3, name: "Startups" },
  ];
  
  const [newCampaign, setNewCampaign] = useState<Campaign>({
    name: "",
    type: "",
    dealValue: "",
    currency: "",
    period: "",
    periodValue: "",
    targetAudience: "",
    description: "",
  });

  const addCampaign = () => {
    if (!newCampaign.name || !newCampaign.type) {
      console.error("Required fields are missing");
      return;
    }

    // Add the new campaign to the campaign list
    setCampaigns([...campaigns, newCampaign]);

    // Reset the form
    setNewCampaign({
      name: "",
      type: "",
      dealValue: "",
      currency: "",
      period: "",
      periodValue: "",
      targetAudience: "",
      description: "",
    });

    // Close the dialog
    setIsAddingTask(false);
  };



  return (
    <div className="container mx-auto p-4">
      <div>
          
     <div className="flex justify-end"> 
     <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
                <DialogTrigger asChild>
                  <Button>Add Campaign</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Campaign</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new campaign.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newCampaign.name}
                        onChange={(e) =>
                          setNewCampaign({ ...newCampaign, name: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Campaign Type
                      </Label>
                      <Select
                        value={newCampaign.type}
                        onValueChange={(value) =>
                          setNewCampaign({ ...newCampaign, type: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {campaignTypes.map((type) => (
                            <SelectItem key={type.id} value={type.name}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                        
                      </Select>
                      
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="currency" className="text-right">
                        Currency
                      </Label>
                      <Select
                        value={newCampaign.currency}
                        onValueChange={(value) =>
                          setNewCampaign({ ...newCampaign,currency: value})
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.id} value={currency.name}>
                              {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                        
                      </Select>
                      <Label htmlFor="dealValue" className="text-right">
                        Deal Value
                      </Label>
                      <Input
                        id="dealValue"
                        value={newCampaign.dealValue}
                        onChange={(e) =>
                          setNewCampaign({ ...newCampaign, dealValue: e.target.value })
                        }
                        className="col-span-3"
                      />
                      <Label htmlFor="dealValue" className="text-right">
                        Period
                      </Label>
                      <Input
                        id="period"
                        value={newCampaign.period}
                        onChange={(e) =>
                          setNewCampaign({ ...newCampaign, period: e.target.value })
                        }
                        className="col-span-3"
                      />
                      <Label htmlFor="name" className="text-right">
                        Period Value
                      </Label>
                      <Input
                        id="periodValue"
                        value={newCampaign.periodValue}
                        onChange={(e) =>
                          setNewCampaign({ ...newCampaign, periodValue: e.target.value })
                        }
                        className="col-span-3"
                      /> 
                      <Label htmlFor="targetAudience" className="text-right">
                      Target Audience
                    </Label>
                       <Select
                        value={newCampaign.targetAudience}
                        onValueChange={(value) =>
                          setNewCampaign({ ...newCampaign,targetAudience: value})
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select Audience" />
                        </SelectTrigger>
                        <SelectContent>
                          {targetAudiences.map((audience) => (
                            <SelectItem key={audience.id} value={audience.name}>
                              {audience.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Label htmlFor="description" className="text-right">
                      Description
                      </Label>
                      <Input
                        id="description"
                        value={newCampaign.description}
                        onChange={(e) =>
                          setNewCampaign({ ...newCampaign, description: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={addCampaign}>Add Campaign</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
    </div>
        
        </div>
            
      <MarketingTable />
    </div>
  );
};