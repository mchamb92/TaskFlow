// src/App.jsx
import { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load tasks on first render
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setError("");
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tasks. Is the backend running on port 8080?");
      }
    };

    loadTasks();
  }, []);

  // Handle create
  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const newTask = await createTask({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });

      setTasks((prev) => [...prev, newTask]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setError("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle complete
  const handleToggleCompleted = async (task) => {
    try {
      const updated = await updateTask(task.id, {
        ...task,
        completed: !task.completed,
      });

      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updated : t))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update task.");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Task Manager</h1>

      {error && (
        <div
          style={{
            backgroundColor: "#fde2e1",
            color: "#a31212",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            border: "1px solid #f5b3b1",
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleCreateTask}
        style={{
          marginBottom: "2rem",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Create Task</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "0.25rem",
              fontWeight: 500,
            }}
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="description"
            style={{
              display: "block",
              marginBottom: "0.25rem",
              fontWeight: 500,
            }}
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description (optional)"
            rows={3}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
              resize: "vertical",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.5rem 1.25rem",
            borderRadius: "999px",
            border: "none",
            fontSize: "0.95rem",
            fontWeight: 500,
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      <section>
        <h2 style={{ marginBottom: "0.75rem" }}>Tasks</h2>

        {tasks.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No tasks yet. Create one above.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {tasks.map((task) => (
              <li
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  marginBottom: "0.5rem",
                  backgroundColor: task.completed ? "#ecfdf3" : "white",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 500,
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </div>
                  {task.description && (
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "#6b7280",
                        textDecoration: task.completed ? "line-through" : "none",
                      }}
                    >
                      {task.description}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleToggleCompleted(task)}
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                      border: "1px solid #d1d5db",
                      backgroundColor: "white",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    {task.completed ? "Mark Incomplete" : "Mark Done"}
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                      border: "1px solid #f97373",
                      backgroundColor: "#fee2e2",
                      color: "#b91c1c",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
