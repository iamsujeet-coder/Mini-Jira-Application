export default function TaskForm({
  title,
  setTitle,
  priority,
  setPriority,
  assignee,
  setAssignee,
  onAddTask,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md border border-blue-100"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">Create New Task</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          required
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-white"
        >
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>

        <input
          type="text"
          placeholder="Assignee Name"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 active:scale-95"
        >
          + Add Task
        </button>
      </div>
    </form>
  );
}
