import React, { useState, useCallback } from 'react';

// View component responsible for rendering the UI and handling user input
const TaskView = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
    // State for the new task input field
    const [newTaskText, setNewTaskText] = useState('');

    // Handle form submission for adding new tasks
    // Memoized to prevent unnecessary recreations
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (newTaskText.trim()) {
            onAddTask(newTaskText);     // Call the provided callback
            setNewTaskText('');         // Clear the input field
        }
    }, [newTaskText, onAddTask]);

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>
            
            {/* Form for adding new tasks */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add new task..."
                />
                <button type="submit">Add Task</button>
            </form>
            
            {/* List of existing tasks */}
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleTask(task.id)}
                        />
                        <span style={{ 
                            textDecoration: task.completed ? 'line-through' : 'none' 
                        }}>
                            {task.text}
                        </span>
                        <button onClick={() => onDeleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskView;