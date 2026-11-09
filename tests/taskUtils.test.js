import test from 'node:test'
import assert from 'node:assert/strict'
import { createTask, toggleTask, deleteTask, filterTasks } from '../src/taskUtils.js'

const tasks = [
  { id: 'a', title: 'Learn React', done: false, priority: 'High' },
  { id: 'b', title: 'Write tests', done: true, priority: 'Medium' },
]

test('creates a task with trimmed title and correct defaults', () => {
  assert.deepEqual(createTask('  New task  ', 'Low', 'c'), {
    id: 'c', title: 'New task', done: false, priority: 'Low',
  })
})

test('rejects blank task titles', () => {
  assert.equal(createTask('   ', 'High', 'c'), null)
})

test('toggles only the selected task without mutating existing data', () => {
  const updated = toggleTask(tasks, 'a')
  assert.equal(updated[0].done, true)
  assert.equal(updated[1].done, true)
  assert.equal(tasks[0].done, false)
})

test('deletes only the selected task', () => {
  assert.deepEqual(deleteTask(tasks, 'a').map(task => task.id), ['b'])
  assert.equal(tasks.length, 2)
})

test('searches tasks case-insensitively', () => {
  assert.deepEqual(filterTasks(tasks, 'REACT', 'all').map(task => task.id), ['a'])
})

test('filters active and completed tasks', () => {
  assert.deepEqual(filterTasks(tasks, '', 'active').map(task => task.id), ['a'])
  assert.deepEqual(filterTasks(tasks, '', 'completed').map(task => task.id), ['b'])
})

test('combines search and status filters', () => {
  assert.deepEqual(filterTasks(tasks, 'tests', 'active'), [])
  assert.deepEqual(filterTasks(tasks, 'tests', 'completed').map(task => task.id), ['b'])
})
