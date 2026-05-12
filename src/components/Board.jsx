import { DragDropContext } from "@hello-pangea/dnd";
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";

export default function Board({
  tasks,
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
  onAddTask,
  onDeleteTask,
  onEditTask,
  onDragEnd,
  onUndo,
  canUndo,
}) {
  return (
    <div className="space-y-6">
      <TaskForm
        title={title}
        setTitle={setTitle}
        priority={priority}
        setPriority={setPriority}
        assignee={assignee}
        setAssignee={setAssignee}
        onAddTask={onAddTask}
      />

      <div className="bg-white p-4 rounded-lg shadow-sm grid gap-4 md:grid-cols-[1fr_auto] items-center">
        <div className="flex flex-col md:flex-row gap-3 items-stretch">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <input
            type="text"
            value={filterAssignee}
            onChange={(e) => setFilterAssignee(e.target.value)}
            placeholder="Filter by assignee"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="self-start rounded-lg px-5 py-3 font-semibold text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 bg-blue-600 hover:bg-blue-700"
        >
          Undo
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            status="todo"
            title="To Do"
            tasks={tasks}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
          <TaskColumn
            status="inprogress"
            title="In Progress"
            tasks={tasks}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
          <TaskColumn
            status="done"
            title="Done"
            tasks={tasks}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        </div>
      </DragDropContext>
    </div>
  );
}
