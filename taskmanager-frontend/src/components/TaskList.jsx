import React from 'react';

function TaskList({ tasks, onToggleComplete, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Create one above.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <div className="task-main">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task)}
            />
            <div className="task-text">
              <span className="task-title">{task.title}</span>
              {task.description && (
                <span className="task-desc">{task.description}</span>
              )}
            </div>
          </div>

          <button className="delete-btn" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
