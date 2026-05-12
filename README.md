# Mini Jira - Frontend Internship Task

A simplified Jira-style issue tracker built with React and Vite. The app supports task creation, editing, deletion, drag-and-drop movement, filtering, persistence, and undo functionality.

---

## Live Demo

[Open Mini Jira](https://mini-jira-application.onrender.com/)

---

## Core Features

- ✅ Kanban board with Todo, In Progress, and Done columns
- ✅ Task cards show title, priority, and assignee
- ✅ Create tasks with required title input
- ✅ Edit tasks after creation
- ✅ Delete tasks from any column
- ✅ Move tasks across columns and reorder inside the same column
- ✅ Filter tasks by priority and assignee
- ✅ Persist board state in localStorage
- ✅ Undo last action for add/edit/delete/move

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- @hello-pangea/dnd

---

## Installation

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open in browser:

```text
http://localhost:5173/
```

---

## Build for Production

```bash
npm run build
```

---

## Project Structure

```text
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

---

## Approach

- Kept UI and logic separate using reusable reusable components
- Used a custom hook for task state management, filters, persistence, and undo
- Stored tasks in localStorage so data remains after page refresh
- Used @hello-pangea/dnd for smooth drag-and-drop interactions

---

## Trade-offs

- Uses local state and localStorage only (no backend integration)
- Undo functionality uses history snapshots instead of a complete action log
- Filtering and drag-and-drop logic are handled together to keep implementation simpler

---

## Future Improvements

- Add task due dates and tags
- Support multiple assignees or user profiles
- Add search and sorting functionality
- Add backend API for real persistence
- Add unit tests for hooks and helper utilities

---

## Built With

- React
- Vite
- Tailwind CSS
- @hello-pangea/dnd
