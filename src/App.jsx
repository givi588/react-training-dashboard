import { useState, useEffect } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Learn React Components', done: true, priority: 'High' },
  { id: 2, title: 'Practice useState and Props', done: false, priority: 'High' },
  { id: 3, title: 'Understand useEffect', done: false, priority: 'Medium' },
  { id: 4, title: 'Build a React Project', done: false, priority: 'High' },
]

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`task ${task.done ? 'completed' : ''}`}>
      <div>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.title}</span>
        <small>{task.priority}</small>
      </div>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  )
}

function Stats({ tasks }) {
  const completed = tasks.filter(task => task.done).length

  return (
    <div className="stats">
      <div><strong>{tasks.length}</strong><span>Total Tasks</span></div>
      <div><strong>{completed}</strong><span>Completed</span></div>
      <div><strong>{tasks.length - completed}</strong><span>Remaining</span></div>
    </div>
  )
}

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('react-training-tasks')
      return saved ? JSON.parse(saved) : initialTasks
    } catch {
      return initialTasks
    }
  })

  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('react-training-dark-mode') === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    localStorage.setItem('react-training-tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    try {
      localStorage.setItem('react-training-dark-mode', String(darkMode))
    } catch {
      // Keep theme switching functional when storage is unavailable.
    }
  }, [darkMode])

  useEffect(() => {
    document.title = 'React Training Dashboard'
  }, [])

  function addTask(event) {
    event.preventDefault()
    const cleanTitle = title.trim()

    if (!cleanTitle) return

    const newTask = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      done: false,
      priority,
    }

    setTasks(previous => [...previous, newTask])
    setTitle('')
  }

  function toggleTask(id) {
    setTasks(previous =>
      previous.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  function deleteTask(id) {
    setTasks(previous => previous.filter(task => task.id !== id))
  }

  const visibleTasks = tasks.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.done) ||
      (filter === 'active' && !task.done)

    return matchesSearch && matchesFilter
  })

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <main className="container">
        <header>
          <div>
            <h1>React Training Dashboard</h1>
            <p>Manage tasks and practice React fundamentals.</p>
          </div>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        <Stats tasks={tasks} />

        <form onSubmit={addTask} className="form">
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="Enter a new task..."
            maxLength={100}
          />

          <select
            value={priority}
            onChange={event => setPriority(event.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button type="submit">Add Task</button>
        </form>

        <div className="filters">
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={event => setSearch(event.target.value)}
          />

          <select
            value={filter}
            onChange={event => setFilter(event.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <section className="task-list">
          {visibleTasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            visibleTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </section>

        <footer>Built with React + Vite</footer>
      </main>
    </div>
  )
}

export default App
