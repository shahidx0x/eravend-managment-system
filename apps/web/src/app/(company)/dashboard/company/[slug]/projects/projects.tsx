/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";

import { Plus, Edit, Trash2, UserPlus, UserMinus } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nx-next-shadcn/shadcn";

export function ProjectsTab() {
  type Project = {
    id: number;
    name: string;
    progress: number;
    budget: {
      total: number;
      spent: number;
    };
    status: string;
    teamLead: string;
    associates: string[];
  };

  const [projects, setProjects] = useState<Project[] | null>([
    {
      id: 1,
      name: "Website Redesign",
      progress: 75,
      budget: { total: 10000, spent: 7500 },
      status: "In Progress",
      teamLead: "Alice Johnson",
      associates: ["Bob Smith", "Charlie Brown"],
    },
    {
      id: 2,
      name: "Mobile App Development",
      progress: 40,
      budget: { total: 50000, spent: 20000 },
      status: "On Hold",
      teamLead: "David Lee",
      associates: ["Eve White", "Frank Green"],
    },
    {
      id: 3,
      name: "Marketing Campaign",
      progress: 90,
      budget: { total: 20000, spent: 18000 },
      status: "Completed",
      teamLead: "Grace Taylor",
      associates: ["Henry Black", "Ivy Red"],
    },
  ]);

  const [editingProject, setEditingProject] = useState<Project | null>();
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    budget: { total: 0, spent: 0 },
    status: "To Do",
    teamLead: "",
    associates: [],
  });
  const [viewingProject, setViewingProject] = useState(null);
  const [newAssociate, setNewAssociate] = useState("");

  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project });
  };

  const handleUpdateProject = () => {
    setProjects(
      //@ts-ignore
      projects.map((p) => (p.id === editingProject?.id ? editingProject : p)),
    );
    setEditingProject(null);
  };

  //@ts-ignore
  const handleDeleteProject = (id) => {
    //@ts-ignore
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleAddProject = () => {
    setProjects([
      //@ts-ignore
      ...projects,
      //@ts-ignore
      { ...newProject, id: projects.length + 1, progress: 0 },
    ]);
    setNewProject({
      name: "",
      budget: { total: 0, spent: 0 },
      status: "To Do",
      teamLead: "",
      associates: [],
    });
    setIsAddingProject(false);
  };

  const handleAddAssociate = () => {
    //@ts-ignore
    if (newAssociate && !viewingProject.associates.includes(newAssociate)) {
      const updatedProject = {
        //@ts-ignore
        ...viewingProject,
        //@ts-ignore
        associates: [...viewingProject.associates, newAssociate],
      };
      setViewingProject(updatedProject);
      setProjects(
        //@ts-ignore
        projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
      );
      setNewAssociate("");
    }
  };
  //@ts-ignore
  const handleRemoveAssociate = (associate) => {
    const updatedProject = {
      //@ts-ignore
      ...viewingProject,
      //@ts-ignore
      associates: viewingProject.associates.filter((a) => a !== associate),
    };
    setViewingProject(updatedProject);
    setProjects(
      //@ts-ignore
      projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
    );
  };
  //@ts-ignore
  const handleProgressUpdate = (value) => {
    //@ts-ignore
    const updatedProject = { ...viewingProject, progress: parseInt(value) };
    setViewingProject(updatedProject);
    setProjects(
      //@ts-ignore
      projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
    );
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Enter the details for the new project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budget" className="text-right">
                  Budget
                </Label>
                <Input
                  id="budget"
                  type="number"
                  value={newProject.budget.total}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      budget: {
                        ...newProject.budget,
                        total: Number(e.target.value),
                      },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <select
                  id="status"
                  value={newProject.status}
                  onChange={(e) =>
                    setNewProject({ ...newProject, status: e.target.value })
                  }
                  className="col-span-3"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>On Hold</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teamLead" className="text-right">
                  Team Lead
                </Label>
                <Input
                  id="teamLead"
                  value={newProject.teamLead}
                  onChange={(e) =>
                    setNewProject({ ...newProject, teamLead: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddProject}>Add Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>Lead by {project.teamLead}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge
                    //@ts-ignore
                    variant={
                      project.status === "Completed"
                        ? "success"
                        : project.status === "In Progress"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                <div>
                  <span>Progress:</span>
                  <Progress value={project.progress} className="mt-2" />
                </div>
                <div>
                  <span>Budget:</span>
                  <p>
                    ${project.budget.spent.toLocaleString()} / $
                    {project.budget.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog
                onOpenChange={(open) => {
                  //@ts-ignore
                  if (open) setViewingProject(project);
                  else setViewingProject(null);
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">View Details</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{project.name}</DialogTitle>
                    <DialogDescription>
                      Project details and team members
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Team Lead</h4>
                      <p>{project.teamLead}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Progress</h4>
                      <Select
                        value={project.progress.toString()}
                        onValueChange={handleProgressUpdate}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select progress" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: 19 },
                            (_, i) => (i + 1) * 5,
                          ).map((value) => (
                            <SelectItem key={value} value={value.toString()}>
                              {value}%
                            </SelectItem>
                          ))}
                          <SelectItem value="100">100%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <h4 className="font-semibold">Associates</h4>
                      <ul className="list-inside list-disc">
                        {project.associates.map((associate, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between"
                          >
                            {associate}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveAssociate(associate)}
                            >
                              <UserMinus className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add associate"
                        value={newAssociate}
                        onChange={(e) => setNewAssociate(e.target.value)}
                      />
                      <Button onClick={handleAddAssociate}>
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditProject(project)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog
        open={editingProject !== null}
        onOpenChange={() => setEditingProject(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to the project here.
            </DialogDescription>
          </DialogHeader>
          {editingProject && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingProject.name}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-progress" className="text-right">
                  Progress
                </Label>
                <Input
                  id="edit-progress"
                  type="number"
                  value={editingProject.progress}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      progress: Number(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-budget" className="text-right">
                  Budget
                </Label>
                <Input
                  id="edit-budget"
                  type="number"
                  value={editingProject.budget.total}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      budget: {
                        ...editingProject.budget,
                        total: Number(e.target.value),
                      },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <select
                  id="edit-status"
                  value={editingProject.status}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      status: e.target.value,
                    })
                  }
                  className="col-span-3"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>On Hold</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-teamLead" className="text-right">
                  Team Lead
                </Label>
                <Input
                  id="edit-teamLead"
                  value={editingProject.teamLead}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      teamLead: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateProject}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
