import { useEffect, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function TaskCard({ task, index, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(task.title);
  const [editablePriority, setEditablePriority] = useState(task.priority);
  const [editableAssignee, setEditableAssignee] = useState(task.assignee);

  useEffect(() => {
    setEditableTitle(task.title);
    setEditablePriority(task.priority);
    setEditableAssignee(task.assignee);
  }, [task]);

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    };
    return colors[priority] || colors.low;
  };

  const handleSave = () => {
    if (!editableTitle.trim()) return;
    onEdit(task.id, {
      title: editableTitle.trim(),
      priority: editablePriority,
      assignee: editableAssignee.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableTitle(task.title);
    setEditablePriority(task.priority);
    setEditableAssignee(task.assignee);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white border rounded-lg p-4 mb-3 shadow-sm transition-all ${
            snapshot.isDragging ? "shadow-lg rotate-3 bg-blue-50" : ""
          }`}
        >
          {isEditing ? (
            <div className="space-y-3">
              <input
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={editablePriority}
                  onChange={(e) => setEditablePriority(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <input
                  value={editableAssignee}
                  onChange={(e) => setEditableAssignee(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Assignee"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                <strong>Assignee:</strong> {task.assignee || "Unassigned"}
              </p>

              <button
                onClick={() => onDelete(task.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded transition-colors duration-200"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}
