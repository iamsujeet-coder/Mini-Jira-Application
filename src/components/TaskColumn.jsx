import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function TaskColumn({ status, title, tasks, onDeleteTask, onEditTask }) {
  const columnTasks = tasks.filter((task) => task.status === status);

  const getColumnIcon = (status) => {
    const icons = {
      todo: "📋",
      inprogress: "⚙️",
      done: "✅",
    };
    return icons[status] || "📋";
  };

  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`bg-white rounded-lg shadow-md p-4 min-h-[500px] transition-all ${
            snapshot.isDraggingOver ? "bg-blue-50 shadow-lg" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{getColumnIcon(status)}</span>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <span className="ml-auto bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full">
              {columnTasks.length}
            </span>
          </div>

          <div className="space-y-3">
            {columnTasks.length > 0 ? (
              columnTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onDelete={onDeleteTask}
                  onEdit={onEditTask}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No tasks yet</p>
              </div>
            )}
          </div>

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
