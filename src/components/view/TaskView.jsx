import React from 'react';

// View - Pure presentational component
// Only concerned with rendering data and forwarding user actions to commands
const TaskView = ({ viewModel }) => {
    // Destructure everything needed from viewModel
    const { taskStats, displayTasks, commands } = viewModel;
    
    // Local state for input field
    // This is UI-specific state that doesn't belong in the ViewModel
    const [newTaskText, setNewTaskText] = React.useState('');

    // Local handler for form submission
    // Calls the appropriate command and clears input
    const handleSubmit = (e) => {
        e.preventDefault();
        commands.addTask(newTaskText);
        setNewTaskText('');
    };

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>
            
            {/* Statistics section */}
            <div className="task-stats">
                <span>Total: {taskStats.total}&nbsp;</span>
                <span>Completed: {taskStats.completed}&nbsp;</span>
                <span>Pending: {taskStats.pending}</span>
            </div>

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
                {displayTasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => commands.toggleTask(task.id)}
                        />
                        <div>
                            <span style={{ 
                                textDecoration: task.completed ? 'line-through' : 'none' 
                            }}>
                                {task.text}
                            </span>
                            <small>{task.formattedDate}</small>
                        </div>
                        <button onClick={() => commands.deleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskView;