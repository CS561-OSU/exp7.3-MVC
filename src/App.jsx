import React, { useState } from 'react'
import './styles/index.css'

function App() {
    // State management for tasks array and input field
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');

    // Handler for form submission - creates a new task
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTaskText.trim()) {
            // Using functional update to safely update state based on previous state
            setTasks(currentTasks => [...currentTasks, {
                id: Date.now(),  // Using timestamp as a simple unique ID
                text: newTaskText,
                completed: false
            }]);
            setNewTaskText('');  // Clear input field after adding task
        }
    };

    // Handler for toggling task completion status
    const toggleTask = (taskId) => {
        setTasks(currentTasks => currentTasks.map(task =>
            task.id === taskId 
                ? { ...task, completed: !task.completed }  // Toggle the task that matches ID
                : task  // Keep other tasks unchanged
        ));
    };

    // Handler for deleting a task
    const deleteTask = (taskId) => {
        setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
    };

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>
            
            {/* Task input form */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add new task..."
                />
                <button type="submit">Add Task</button>
            </form>
            
            {/* Task list */}
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                        />
                        <span style={{ 
                            textDecoration: task.completed ? 'line-through' : 'none' 
                        }}>
                            {task.text}
                        </span>
                        <button onClick={() => deleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App