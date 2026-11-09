export function createTask(title, priority, id) {
  const cleanTitle = title.trim()
  if (!cleanTitle) return null

  return { id, title: cleanTitle, done: false, priority }
}

export function toggleTask(tasks, id) {
  return tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  )
}

export function deleteTask(tasks, id) {
  return tasks.filter(task => task.id !== id)
}

export function filterTasks(tasks, search, filter) {
  return tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.done) ||
      (filter === 'active' && !task.done)

    return matchesSearch && matchesFilter
  })
}
