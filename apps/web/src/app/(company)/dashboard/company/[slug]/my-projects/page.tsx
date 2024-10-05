/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Plus, UserPlus, UserMinus } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@nx-next-shadcn/shadcn";

/* eslint-disable react/no-unescaped-entities */

interface Project {
  id: number;
  name: string;
  progress: number;
  status: string;
  teamLead: string;
  associates: string[];
  budget: {
    total: number;
    spent: number;
  };
}

interface Task {
  id: number;
  title: string;
  status: "Todo" | "In Progress" | "Complete";
  project: string;
}

const currentUser = "John Doe"; // Simulating the current user

export default function MyProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Website Redesign",
      progress: 75,
      status: "In Progress",
      teamLead: "Alice Johnson",
      associates: ["John Doe", "Charlie Brown"],
      budget: { total: 10000, spent: 7500 },
    },
    {
      id: 2,
      name: "Mobile App Development",
      progress: 40,
      status: "On Hold",
      teamLead: "John Doe",
      associates: ["Eve White", "Frank Green"],
      budget: { total: 50000, spent: 20000 },
    },
    {
      id: 3,
      name: "Marketing Campaign",
      progress: 90,
      status: "Completed",
      teamLead: "Grace Taylor",
      associates: ["John Doe", "Ivy Red"],
      budget: { total: 20000, spent: 18000 },
    },
    {
      id: 4,
      name: "Database Optimization",
      progress: 60,
      status: "In Progress",
      teamLead: "John Doe",
      associates: ["Alice Johnson", "Bob Smith"],
      budget: { total: 15000, spent: 9000 },
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design homepage mockup",
      status: "Todo",
      project: "Website Redesign",
    },
    {
      id: 2,
      title: "Implement user authentication",
      status: "In Progress",
      project: "Mobile App Development",
    },
    {
      id: 3,
      title: "Create social media content",
      status: "Complete",
      project: "Marketing Campaign",
    },
    {
      id: 4,
      title: "Optimize database queries",
      status: "Todo",
      project: "Database Optimization",
    },
    {
      id: 5,
      title: "Design app icon",
      status: "In Progress",
      project: "Mobile App Development",
    },
  ]);

  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    status: "Todo",
    project: "",
  });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<string>("All");
  const [newAssociate, setNewAssociate] = useState("");

  const assignedProjects = projects.filter(
    (project) =>
      project.associates.includes(currentUser) &&
      project.teamLead !== currentUser,
  );
  const leadingProjects = projects.filter(
    (project) => project.teamLead === currentUser,
  );

  const handleAddTask = () => {
    if (newTask.title && newTask.project) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({ title: "", status: "Todo", project: "" });
      setIsAddingTask(false);
    }
  };

  const handleAddAssociate = () => {
    if (
      newAssociate &&
      viewingProject &&
      !viewingProject.associates.includes(newAssociate)
    ) {
      const updatedProject = {
        ...viewingProject,
        associates: [...viewingProject.associates, newAssociate],
      };
      setViewingProject(updatedProject);
      setProjects(
        projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
      );
      setNewAssociate("");
    }
  };

  const handleRemoveAssociate = (associate: string) => {
    if (viewingProject) {
      const updatedProject = {
        ...viewingProject,
        associates: viewingProject.associates.filter((a) => a !== associate),
      };
      setViewingProject(updatedProject);
      setProjects(
        projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
      );
    }
  };

  const handleProgressUpdate = (value: string) => {
    if (viewingProject) {
      const updatedProject = { ...viewingProject, progress: parseInt(value) };
      setViewingProject(updatedProject);
      setProjects(
        projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
      );
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [reorderedItem] = newTasks.splice(result.source.index, 1);
    reorderedItem.status = result.destination.droppableId as
      | "Todo"
      | "In Progress"
      | "Complete";
    newTasks.splice(result.destination.index, 0, reorderedItem);

    setTasks(newTasks);
  };

  const filteredTasks =
    selectedProject === "All"
      ? tasks
      : tasks.filter((task) => task.project === selectedProject);

  const ProjectCard = ({
    project,
    isLeading,
  }: {
    project: Project;
    isLeading: boolean;
  }) => (
    <Card key={project.id}>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>Lead by {project.teamLead}</CardDescription>
        <Badge
          variant={
            project.status === "Completed"
              ? "outline"
              : project.status === "In Progress"
                ? "default"
                : "secondary"
          }
        >
          {project.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div>
          <span>Progress:</span>
          <Progress value={project.progress} className="mt-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Dialog
          onOpenChange={(open) => {
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
                  disabled={!isLeading}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select progress" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (i + 1) * 10).map(
                      (value) => (
                        <SelectItem key={value} value={value.toString()}>
                          {value}%
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h4 className="font-semibold">Budget</h4>
                <p>
                  ${project.budget.spent.toLocaleString()} / $
                  {project.budget.total.toLocaleString()}
                </p>
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
                      {isLeading && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAssociate(associate)}
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {isLeading && (
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
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">My Project Dashboard</TabsTrigger>
          <TabsTrigger value="kanban">Task Kanban Board</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Tabs defaultValue="assigned">
            <TabsList>
              <TabsTrigger value="assigned">
                Projects Assigned to Me
              </TabsTrigger>
              <TabsTrigger value="leading">Projects I'm Leading</TabsTrigger>
            </TabsList>
            <TabsContent value="assigned">
              <h2 className="mb-4 text-2xl font-bold">
                Projects Assigned to Me
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {assignedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isLeading={false}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="leading">
              <h2 className="mb-4 text-2xl font-bold">Projects I'm Leading</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {leadingProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isLeading={true}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="kanban">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Task Kanban Board</h2>
            <div className="flex gap-2">
              <Select
                value={selectedProject}
                onValueChange={setSelectedProject}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Projects</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.name}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
                <DialogTrigger asChild>
                  <Button>Add Task</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new task.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newTask.title}
                        onChange={(e) =>
                          setNewTask({ ...newTask, title: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="project" className="text-right">
                        Project
                      </Label>
                      <Select
                        value={newTask.project}
                        onValueChange={(value) =>
                          setNewTask({ ...newTask, project: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.name}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddTask}>Add Task</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {(["Todo", "In Progress", "Complete"] as const).map((status) => (
                <div key={status}>
                  <h3 className="mb-2 text-lg font-semibold">{status}</h3>
                  <Droppable droppableId={status}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[200px] rounded-lg bg-gray-100 p-4"
                      >
                        {filteredTasks
                          .filter((task) => task.status === status)
                          .map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={task.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mb-2"
                                >
                                  <CardHeader>
                                    <CardTitle className="text-sm">
                                      {task.title}
                                    </CardTitle>
                                    <CardDescription>
                                      {task.project}
                                    </CardDescription>
                                  </CardHeader>
                                </Card>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </TabsContent>
      </Tabs>
    </div>
  );
}
