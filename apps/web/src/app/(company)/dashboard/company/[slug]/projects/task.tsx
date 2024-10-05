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
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design homepage mockup",
      project: "Website Redesign",
      assignee: "Alice",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-07-20",
    },
    {
      id: 2,
      title: "Implement user authentication",
      project: "Mobile App Development",
      assignee: "Bob",
      status: "To Do",
      priority: "Medium",
      dueDate: "2023-07-25",
    },
    {
      id: 3,
      title: "Create social media content",
      project: "Marketing Campaign",
      assignee: "Charlie",
      status: "Completed",
      priority: "Low",
      dueDate: "2023-07-15",
    },
    {
      id: 4,
      title: "Conduct user testing",
      project: "Mobile App Development",
      assignee: "David",
      status: "To Do",
      priority: "High",
      dueDate: "2023-07-30",
    },
    {
      id: 5,
      title: "Optimize database queries",
      project: "Website Redesign",
      assignee: "Eve",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2023-08-05",
    },
    {
      id: 6,
      title: "Design app icon",
      project: "Mobile App Development",
      assignee: "Frank",
      status: "Completed",
      priority: "Low",
      dueDate: "2023-07-10",
    },
    {
      id: 7,
      title: "Write press release",
      project: "Marketing Campaign",
      assignee: "Grace",
      status: "To Do",
      priority: "High",
      dueDate: "2023-08-15",
    },
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);

  const projects = ["All", ...new Set(tasks.map((task) => task.project))];
  //@ts-ignore
  const handleEditTask = (task) => {
    setEditingTask({ ...task });
  };

  const handleUpdateTask = () => {
    //@ts-ignore
    setTasks(tasks.map((t) => (t.id === editingTask.id ? editingTask : t)));
    setEditingTask(null);
  };
  //@ts-ignore
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Filter tasks based on selected project
  const filteredTasks =
    selectedProject === "All"
      ? tasks
      : tasks.filter((task) => task.project === selectedProject);

  // Get current tasks for pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  //@ts-ignore
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProject]);

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
          <Select value={selectedProject} onValueChange={setSelectedProject}>
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
              <TableHead>Title</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.project}</TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{task.assignee[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Badge
                    //@ts-ignore
                    variant={
                      task.status === "Completed"
                        ? "success"
                        : task.status === "In Progress"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      task.priority === "High"
                        ? "destructive"
                        : task.priority === "Medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditTask(task)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                        <DialogDescription>
                          Make changes to the task here.
                        </DialogDescription>
                      </DialogHeader>
                      {editingTask && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-title" className="text-right">
                              Title
                            </Label>
                            <Input
                              id="edit-title"
                              //@ts-ignore
                              value={editingTask.title}
                              onChange={(e) =>
                                setEditingTask({
                                  //@ts-ignore
                                  ...editingTask,
                                  title: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-project"
                              className="text-right"
                            >
                              Project
                            </Label>
                            <Input
                              id="edit-project"
                              //@ts-ignore
                              value={editingTask.project}
                              onChange={(e) =>
                                setEditingTask({
                                  //@ts-ignore
                                  ...editingTask,
                                  project: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-assignee"
                              className="text-right"
                            >
                              Assignee
                            </Label>
                            <Input
                              id="edit-assignee"
                              //@ts-ignore
                              value={editingTask.assignee}
                              onChange={(e) =>
                                setEditingTask({
                                  //@ts-ignore
                                  ...editingTask,
                                  assignee: e.target.value,
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
                              //@ts-ignore
                              value={editingTask.status}
                              onChange={(e) =>
                                setEditingTask({
                                  //@ts-ignore
                                  ...editingTask,
                                  status: e.target.value,
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
                              htmlFor="edit-priority"
                              className="text-right"
                            >
                              Priority
                            </Label>
                            <select
                              id="edit-priority"
                              //@ts-ignore
                              value={editingTask.priority}
                              onChange={(e) =>
                                setEditingTask({
                                  //@ts-ignore
                                  ...editingTask,
                                  priority: e.target.value,
                                })
                              }
                              className="col-span-3"
                            >
                              <option>Low</option>
                              <option>Medium</option>
                              <option>High</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-dueDate"
                              className="text-right"
                            >
                              Due Date
                            </Label>
                            <Input
                              id="edit-dueDate"
                              type="date"
                              //@ts-ignore
                              value={editingTask.dueDate}
                              onChange={(e) =>
                                setEditingTask({
                                  //@ts-ignore
                                  ...editingTask,
                                  dueDate: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button onClick={handleUpdateTask}>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTask(task.id)}
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
            {Math.min(indexOfLastTask, filteredTasks.length)} of{" "}
            {filteredTasks.length} tasks
          </div>
          <div className="flex gap-2">
            {Array.from(
              { length: Math.ceil(filteredTasks.length / tasksPerPage) },
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
