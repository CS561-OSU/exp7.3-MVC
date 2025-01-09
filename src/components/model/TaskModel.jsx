import React, { useState, useCallback } from 'react';

// Change from factory function to actual component/hook
const useTaskModel = () => {
    // State to hold the array of tasks
    const [tasks, setTasks] = useState([]);

    // Add a new task to the tasks array
    const addTask = useCallback((task) => {
        setTasks(currentTasks => [...currentTasks, {
            id: Date.now(),  // Use timestamp as unique identifier
            text: task,      // The task description
            completed: false // Initial completion status
        }]);
    }, []);

    // Toggle the completed status of a task by ID
    const toggleTask = useCallback((taskId) => {
        setTasks(currentTasks => currentTasks.map(task =>
            task.id === taskId 
                ? { ...task, completed: !task.completed }  // Toggle matched task
                : task  // Keep others unchanged
        ));
    }, []);

    // Remove a task by ID
    const deleteTask = useCallback((taskId) => {
        setTasks(currentTasks => 
            currentTasks.filter(task => task.id !== taskId)
        );
    }, []);

    // Return the public interface of the model
    return {
        tasks,
        addTask,
        toggleTask,
        deleteTask
    };
};

export default useTaskModel;