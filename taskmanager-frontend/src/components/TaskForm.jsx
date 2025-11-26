import React, { useState } from 'react';

function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title cannot be empty');
      return;
    }

    onCreate({
      title: title.trim(),
      description: description.trim(),
      completed: false,
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          maxLength={255}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          maxLength={255}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
        />
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
