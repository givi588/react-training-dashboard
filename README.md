# React Training Dashboard

A responsive task management dashboard built with **React** and **Vite**. This project demonstrates React components, state management, effects, controlled forms, filtering, and browser-based persistence.

**[Live demo](https://givi588.github.io/react-training-dashboard/)**

## Features

- Add tasks with Low, Medium, or High priority
- Mark tasks complete or active
- Delete tasks
- Search tasks by title
- Filter all, active, or completed tasks
- View total, completed, and remaining task counts
- Switch between light and dark mode
- Save tasks locally in the browser using `localStorage`
- Responsive layout

## Tech stack

- React
- JavaScript (JSX)
- CSS
- Vite
- GitHub Pages

## Run locally

Requirements: Node.js and npm.

```bash
git clone https://github.com/givi588/react-training-dashboard.git
cd react-training-dashboard
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build and lint

```bash
npm run build
npm run lint
```

The production build is generated in `dist/`.

## Data storage

Tasks are stored in the browser's `localStorage` under `react-training-tasks`. They remain on the same browser/device after a refresh, but do not sync between devices. Clearing site storage removes the saved tasks.

## Project status

The dashboard is published as a learning and portfolio project. It does not have accounts, a backend, or cloud synchronization.

## Author

[GitHub: givi588](https://github.com/givi588)
