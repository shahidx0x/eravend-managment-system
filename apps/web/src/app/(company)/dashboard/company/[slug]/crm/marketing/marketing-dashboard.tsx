"use client";

import React, { useEffect, useState } from "react";

import { Edit, PlusIcon, Trash2 } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  SelectGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nx-next-shadcn/shadcn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

export default function MarketingDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportFormat, setReportFormat] = useState("pdf");

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Campaign Alpha",
      type: "Email Marketing",
      progress: "In Progress",
      members: ["Alice Johnson", "Bob Smith"],
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      created: "2023-12-01",
      action: "Edit",
      status: "active",
    },
    {
      id: 2,
      name: "Campaign Beta",
      type: "Social Media",
      progress: "Completed",
      members: ["Charlie Brown"],
      startDate: "2024-02-15",
      endDate: "2024-08-15",
      created: "2024-01-01",
      action: "View",
      status: "active",
    },
    {
      id: 3,
      name: "Campaign Gamma",
      type: "SEO",
      progress: "Not Started",
      members: ["Alice Johnson", "Charlie Brown"],
      startDate: "2024-09-01",
      endDate: "2025-01-01",
      created: "2024-08-15",
      action: "Edit",
      status: "active",
    },
    {
      id: 4,
      name: "Campaign Gamma",
      type: "SEO",
      progress: "Not Started",
      members: ["Alice Johnson", "Charlie Brown"],
      startDate: "2024-09-01",
      endDate: "2025-01-01",
      created: "2024-08-15",
      action: "Edit",
      status: "active",
    },
    {
      id: 5,
      name: "Campaign Gamma",
      type: "SEO",
      progress: "Not Started",
      members: ["Alice Johnson", "Charlie Brown"],
      startDate: "2024-09-01",
      endDate: "2025-01-01",
      created: "2024-08-15",
      action: "Edit",
      status: "active",
    },
    {
      id: 6,
      name: "Campaign Gamma",
      type: "SEO",
      progress: "Not Started",
      members: ["Alice Johnson", "Charlie Brown"],
      startDate: "2024-09-01",
      endDate: "2025-01-01",
      created: "2024-08-15",
      action: "Edit",
      status: "active",
    },
  ]);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "",
    dealValue: "",
    currency: "",
    period: "",
    periodValue: "",
    targetAudience: [],
    description: "",
  });

  const [editingCampagin, setEditingCampagin] = useState(null);
  const [selectedCampagin, setSelectedCampagin] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(5);
  const [selectedType, setSelectedType] = useState("All");
  const type = ["All", ...new Set(campaigns.map((cam) => cam.type))];
  const handleUpdateCampaign = () => {
    //@ts-ignore
    setCampaigns(campaigns.map((t) => (t.id === campaigns.id ? campaigns : t)));
    setEditingCampagin(null);
  };
  //@ts-ignore
  const deleteCampagin = (id) => {
    setCampaigns(campaigns.filter((t) => t.id !== id));
  };
  //@ts-ignore
  const handleEditCampaign = (campaign) => {
    //@ts-ignore
    setEditingCampagin({ ...campaign });
  };
  // Filter tasks based on selected project
  const filteredCampagins =
    selectedType === "All"
      ? campaigns
      : campaigns.filter((campagin) => campagin.name === selectedType);

  // Get current tasks for pagination
  const indexOfLastTask = currentPage * campaignsPerPage;
  const indexOfFirstTask = indexOfLastTask - campaignsPerPage;
  const currentCampagins = filteredCampagins.slice(
    indexOfFirstTask,
    indexOfLastTask,
  );

  // Change page
  //@ts-ignore
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCampagin]);

  const campaignTypes = ["Marketing", "Sales", "Awareness"];
  const currencies = ["USD", "EUR", "GBP"];
  const targetAudiences = ["Small Business", "Corporate Companies", "Startups"];

  const addCampaign = () => {
    // Ensure newCampaign has required fields (e.g., name and type)
    if (!newCampaign.name || !newCampaign.type) {
      console.error("Required fields are missing");
      return; // Prevent adding if required fields are missing
    }

    setCampaigns([
      ...campaigns,
      {
        ...newCampaign,
        id: campaigns.length + 1,
        status: "active",
        progress: "Not Started",
        members: [],
        startDate: "2024-01-01",
        endDate: "2024-06-01",
        created: new Date().toISOString(),
        action: "Edit", // Default action
      },
    ]);

    // Reset the form fields after adding
    setNewCampaign({
      name: "",
      type: "",
      dealValue: "",
      currency: "",
      period: "",
      periodValue: "",
      targetAudience: [],
      description: "",
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <div className="mb-4 flex items-center">
          <Input
            type="text"
            placeholder="Search campaigns"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-sm"
          />
        </div>
        <div className="m-3 mb-10 flex justify-end">
          <div className="mr-10">
            <Card>
              <CardContent className="space-y-4">
                <Select onValueChange={setReportFormat}>
                  <SelectTrigger className="h-[40px] w-[180px]">
                    <SelectValue placeholder="Export" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="pdf">Export as PDF</SelectItem>
                      <SelectItem value="excel">Export as Excel</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" /> Add New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Campaign</DialogTitle>
                </DialogHeader>

                {/* Basic Info Section */}
                <div className="mb-4 flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">Basic Info</h3>
                </div>

                <div className="grid gap-4 py-4">
                  {/* Name Field */}
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
                    <Label htmlFor="campaignType" className="text-right">
                      Campaign Type
                    </Label>
                    <Select
                      onValueChange={
                        (value) =>
                          setNewCampaign({ ...newCampaign, type: value }) // Corrected field name
                      }
                    >
                      <SelectTrigger className="col-span-1">
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        {campaignTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Deal Value, Currency, Period, and Period Value Fields */}
                  <div className="grid grid-cols-4 gap-4">
                    <Label htmlFor="dealValue" className="text-right">
                      Deal Value
                    </Label>
                    <Input
                      id="dealValue"
                      value={newCampaign.dealValue}
                      onChange={(e) =>
                        setNewCampaign({
                          ...newCampaign,
                          dealValue: e.target.value,
                        })
                      }
                      className="col-span-1"
                    />

                    <Label htmlFor="currency" className="text-right">
                      Currency
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setNewCampaign({ ...newCampaign, currency: value })
                      }
                    >
                      <SelectTrigger className="col-span-1">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Label htmlFor="period" className="text-right">
                      Period
                    </Label>
                    <Input
                      id="period"
                      value={newCampaign.period}
                      onChange={(e) =>
                        setNewCampaign({
                          ...newCampaign,
                          period: e.target.value,
                        })
                      }
                      className="col-span-1"
                    />

                    <Label htmlFor="periodValue" className="text-right">
                      Period Value
                    </Label>
                    <Input
                      id="periodValue"
                      value={newCampaign.periodValue}
                      onChange={(e) =>
                        setNewCampaign({
                          ...newCampaign,
                          periodValue: e.target.value,
                        })
                      }
                      className="col-span-1"
                    />
                  </div>

                  {/* Target Audience Field */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="targetAudience" className="text-right">
                      Target Audience
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setNewCampaign({
                          ...newCampaign,
                          targetAudience: value,
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Choose target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {targetAudiences.map((audience) => (
                          <SelectItem key={audience} value={audience}>
                            {audience}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description Field */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={newCampaign.description}
                      onChange={(e) =>
                        setNewCampaign({
                          ...newCampaign,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>

                {/* Actions Section */}
                <div className="mt-4 flex justify-end">
                  <Button type="button" onClick={addCampaign}>
                    Add Campaign
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-center">Progress</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCampagins.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.type}</TableCell>
              <TableCell className="w-[400px] text-center">
                {campaign.progress}
              </TableCell>
              <TableCell>{campaign.members.join(", ")}</TableCell>
              <TableCell>{campaign.startDate}</TableCell>
              <TableCell>{campaign.endDate}</TableCell>
              <TableCell>{campaign.created}</TableCell>

              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditCampaign(campaign)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Campaign</DialogTitle>
                      <DialogDescription>
                        Make changes to the campaign here.
                      </DialogDescription>
                    </DialogHeader>
                    {editingCampagin && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-title" className="text-right">
                            Title
                          </Label>
                          <Input
                            id="edit-title"
                            //@ts-ignore
                            value={editingCampagin.name}
                            onChange={(e) =>
                              setEditingCampagin({
                                //@ts-ignore
                                ...editingCampagin,
                                name: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-campagin" className="text-right">
                            Type
                          </Label>
                          <Input
                            id="edit-project"
                            //@ts-ignore
                            value={editingCampagin.type}
                            onChange={(e) =>
                              setEditingCampagin({
                                //@ts-ignore
                                ...editingCampagin,
                                type: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-members" className="text-right">
                            Members
                          </Label>
                          <Input
                            id="edit-members"
                            //@ts-ignore
                            value={editingCampagin.members}
                            onChange={(e) =>
                              setEditingCampagin({
                                //@ts-ignore
                                ...editingCampagin,
                                members: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-status" className="text-right">
                            Progress
                          </Label>
                          <select
                            id="edit-progress"
                            //@ts-ignore
                            value={editingCampagin.progress}
                            onChange={(e) =>
                              setEditingCampagin({
                                //@ts-ignore
                                ...editingCampagin,
                                progress: e.target.value,
                              })
                            }
                            className="col-span-3"
                          >
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-endDate" className="text-right">
                            End Date
                          </Label>
                          <Input
                            id="edit-endDate"
                            type="date"
                            //@ts-ignore
                            value={editingCampagin.endDate}
                            onChange={(e) =>
                              setEditingCampagin({
                                //@ts-ignore
                                ...editingCampagin,
                                endDate: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button onClick={handleUpdateCampaign}>
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteCampagin(campaign.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex items-center justify-between">
        <div>
          Showing {indexOfFirstTask + 1} to{" "}
          {Math.min(indexOfLastTask, filteredCampagins.length)} of{" "}
          {filteredCampagins.length} tasks
        </div>
        <div className="flex gap-2">
          {Array.from(
            {
              length: Math.ceil(filteredCampagins.length / campaignsPerPage),
            },
            (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </Button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
