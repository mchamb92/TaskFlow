// src/api.js
const API_BASE_URL = 'http://localhost:8080/api/tasks';

export async function fetchTasks() {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) {
    throw new Error('Failed to load tasks');
  }
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    throw new Error('Failed to create task');
  }

  return res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error('Failed to update task');
  }

  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete task');
  }
}
