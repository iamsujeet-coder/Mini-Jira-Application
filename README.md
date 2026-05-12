# Mini Jira - Frontend Internship Task

A simplified Jira-style issue tracker built with React and Vite. The app supports task creation, editing, deletion, drag-and-drop movement, filtering, persistence, and undo.

## Core Features

- ✅ **Kanban board** with Todo, In Progress, and Done columns
- ✅ **Task cards** show title, priority, and assignee
- ✅ **Create tasks** with required title input
- ✅ **Edit tasks** after creation
- ✅ **Delete tasks** from any column
- ✅ **Move tasks** across columns and reorder inside the same column
- ✅ **Filter tasks** by priority and assignee
- ✅ **Persist board state** in localStorage
- ✅ **Undo last action** for add/edit/delete/move

## Usage

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/)

### Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Board.jsx
│   ├── TaskForm.jsx
│   ├── TaskColumn.jsx
│   └── TaskCard.jsx
├── data/
│   └── initialTasks.js
├── utils/
│   ├── taskHelpers.js
│   └── useTaskManagement.js
├── App.jsx
└── index.css
```

## Approach

- Kept the UI and logic separate using reusable components
- Used a custom hook for task state, filters, persistence, and undo
- Stored board tasks in localStorage so refresh does not lose data
- Used `@hello-pangea/dnd` for smooth drag-and-drop interactions

## Trade-offs

- The app uses local state and localStorage only, no backend integration
- Undo supports the last few actions via history snapshots, not a full action log
- Filtering and drag-drop are handled together, which keeps code simpler for this project

## Improvements with more time

- Add task due dates and tags
- Support multiple assignees or user profiles
- Add search and task sorting options
- Add a backend API for real persistence
- Add unit tests for hook and helper logic

---

Built with React, Vite, Tailwind CSS, and `@hello-pangea/dnd`.
