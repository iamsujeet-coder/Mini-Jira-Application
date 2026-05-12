export const updateTaskStatus = (tasks, taskId, newStatus) => {
  return tasks.map((task) =>
    task.id.toString() === taskId ? { ...task, status: newStatus } : task
  );
};

export const deleteTaskById = (tasks, taskId) => {
  return tasks.filter((task) => task.id !== taskId);
};

export const addNewTask = (tasks, taskData) => {
  const newTask = {
    id: Date.now(),
    ...taskData,
    status: "todo",
  };
  return [...tasks, newTask];
};

export const updateTaskDetails = (tasks, taskId, updates) => {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, ...updates } : task
  );
};

export const reorderTasks = (tasks, draggableId, source, destination, matchesFilters) => {
  const taskIdString = draggableId.toString();
  const movingTask = tasks.find((task) => task.id.toString() === taskIdString);
  if (!movingTask) return tasks;

  const remainingTasks = tasks.filter((task) => task.id.toString() !== taskIdString);
  const updatedTask = { ...movingTask, status: destination.droppableId };

  const grouped = {
    todo: [],
    inprogress: [],
    done: [],
  };

  remainingTasks.forEach((task) => grouped[task.status].push(task));
  const destinationList = grouped[destination.droppableId];
  const visibleDestination = destinationList.filter(matchesFilters);

  if (visibleDestination.length === 0) {
    if (destination.index === 0) {
      destinationList.splice(0, 0, updatedTask);
    } else {
      destinationList.push(updatedTask);
    }
  } else if (destination.index >= visibleDestination.length) {
    const lastVisibleId = visibleDestination[visibleDestination.length - 1].id;
    const insertionIndex = destinationList.findIndex((task) => task.id === lastVisibleId);
    destinationList.splice(insertionIndex + 1, 0, updatedTask);
  } else {
    const insertBeforeId = visibleDestination[destination.index].id;
    const insertIndex = destinationList.findIndex((task) => task.id === insertBeforeId);
    destinationList.splice(insertIndex, 0, updatedTask);
  }

  return [...grouped.todo, ...grouped.inprogress, ...grouped.done];
};
