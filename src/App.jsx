import { useTaskManagement } from "./utils/useTaskManagement";
import Header from "./components/Header";
import Board from "./components/Board";

export default function App() {
  const {
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
    canUndo,
  } = useTaskManagement();

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    handleMoveTask(draggableId, source, destination);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        <Board
          tasks={filteredTasks}
          title={title}
          setTitle={setTitle}
          priority={priority}
          setPriority={setPriority}
          assignee={assignee}
          setAssignee={setAssignee}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          filterAssignee={filterAssignee}
          setFilterAssignee={setFilterAssignee}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onDragEnd={handleDragEnd}
          onUndo={handleUndo}
          canUndo={canUndo}
        />
      </div>
    </div>
  );
}