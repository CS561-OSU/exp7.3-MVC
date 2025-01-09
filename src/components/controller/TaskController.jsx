import React, { useCallback } from 'react';
import TaskView from '../view/TaskView';

// Controller component that coordinates between Model and View
const TaskController = ({ model }) => {
    // Handler for adding new tasks
    // Delegates to the model's addTask method
    const handleAddTask = useCallback((taskText) => {
        model.addTask(taskText);
    }, [model]);

    // Handler for toggling task completion
    // Delegates to the model's toggleTask method
    const handleToggleTask = useCallback((taskId) => {
        model.toggleTask(taskId);
    }, [model]);

    // Handler for deleting tasks
    // Delegates to the model's deleteTask method
    const handleDeleteTask = useCallback((taskId) => {
        model.deleteTask(taskId);
    }, [model]);

    // Render the View component with necessary props
    return (
        <TaskView
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            tasks={model.tasks}
        />
    );
};

export default TaskController;