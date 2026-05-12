import { useEffect, useState } from "react";
import { initialTasks } from "../data/initialTasks";
import {
  deleteTaskById,
  addNewTask,
  updateTaskDetails,
  reorderTasks,
} from "./taskHelpers";

const STORAGE_KEY = "miniJiraTasks";

export const useTaskManagement = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [assignee, setAssignee] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterAssignee, setFilterAssignee] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const matchesFilters = (task) => {
    const priorityMatch = filterPriority === "all" || task.priority === filterPriority;
    const assigneeMatch =
      filterAssignee.trim() === "" ||
      task.assignee.toLowerCase().includes(filterAssignee.trim().toLowerCase());
    return priorityMatch && assigneeMatch;
  };

  const filteredTasks = tasks.filter(matchesFilters);

  const pushHistory = (currentTasks) => {
    setHistory((prev) => [...prev.slice(-8), currentTasks]);
  };

  const handleAddTask = () => {
    if (!title.trim()) return;

    pushHistory(tasks);
    const newTasks = addNewTask(tasks, {
      title: title.trim(),
      priority,
      assignee: assignee.trim(),
    });

    setTasks(newTasks);
    setTitle("");
    setPriority("low");
    setAssignee("");
  };

  const handleDeleteTask = (id) => {
    pushHistory(tasks);
    setTasks(deleteTaskById(tasks, id));
  };

  const handleEditTask = (taskId, updates) => {
    if (!updates.title.trim()) return;
    pushHistory(tasks);
    setTasks(updateTaskDetails(tasks, taskId, {
      title: updates.title.trim(),
      priority: updates.priority,
      assignee: updates.assignee.trim(),
    }));
  };

  const handleMoveTask = (draggableId, source, destination) => {
    pushHistory(tasks);
    setTasks(reorderTasks(tasks, draggableId, source, destination, matchesFilters));
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setTasks(previous);
  };

  return {
    tasks,
    filteredTasks,
    title,
    setTitle,
    priority,
    setPriority,
    assignee,
    setAssignee,
    filterPriority,
    setFilterPriority,
    filterAssignee,
    setFilterAssignee,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    handleMoveTask,
    handleUndo,
    canUndo: history.length > 0,
  };
};
