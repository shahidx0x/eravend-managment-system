/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useState, useEffect } from "react";

import { Edit, Trash2 } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nx-next-shadcn/shadcn";

export function TasksTab() {
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

  const [editingCampagin, setEditingCampagin] = useState(null);
  const [selectedCampagin, setSelectedCampagin] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(5);

  const handleUpdateCampaign = () => {
    //@ts-ignore
    setCampaigns(campaigns.map((t) => (t.id === campaigns.id ? campaigns : t)));
    setEditingCampagin(null);
  };
  //@ts-ignore
  const deleteCampagin = (id) => {
    setCampaigns(campaigns.filter((t) => t.id !== id));
  };
  const handleEditCampaign = (campaign) => {
    //@ts-ignore
    setEditingCampagin({ ...campaign });
  };
  // Filter tasks based on selected project
  const filteredCampagins =
    selectedCampagin === "All"
      ? campaigns
      : campaigns.filter((campagin) => campagin.name === selectedCampagin);

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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tasks Monitor</CardTitle>
            <CardDescription>
              Manage and track all tasks across projects
            </CardDescription>
          </div>
          <Select value={selectedCampagin} onValueChange={selectedCampagin}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project} value={project}>
                  {project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
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
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>{campaign.type}</TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{campaign.members[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Badge
                    //@ts-ignore
                    variant={
                      campaign.status === "Completed"
                        ? "success"
                        : campaign.status === "In Progress"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </TableCell>

                <TableCell>{campaign.dueDate}</TableCell>
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
                            <Label
                              htmlFor="edit-campagin"
                              className="text-right"
                            >
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
                            <Label
                              htmlFor="edit-members"
                              className="text-right"
                            >
                              Members
                            </Label>
                            <Input
                              id="edit-assignee"
                              //@ts-ignore
                              value={editingTask.assignee}
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
                            <Label
                              htmlFor="edit-endDate"
                              className="text-right"
                            >
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
      </CardContent>
    </Card>
  );
}
