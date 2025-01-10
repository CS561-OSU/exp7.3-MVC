import { useState, useCallback } from 'react';

// Task Model - Represents the data layer and business logic
// Responsible for managing the raw task data and basic CRUD operations
const useTaskModel = () => {
    // Core state: array of task objects
    const [tasks, setTasks] = useState([]);

    // Create operation: Add a new task to the collection
    // Returns void, updates internal state
    const addTask = useCallback((text) => {
        setTasks(prev => [...prev, {
            id: Date.now(),      // Unique identifier
            text,                // Task description
            completed: false,     // Initial completion status
            createdAt: new Date() // Timestamp for sorting
        }]);
    }, []);

    // Update operation: Modify an existing task
    // Accepts task id and an object of fields to update
    const updateTask = useCallback((id, updates) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, ...updates } : task
        ));
    }, []);

    // Delete operation: Remove a task from collection
    const deleteTask = useCallback((id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    }, []);

    // Public interface of the model
    return {
        tasks,       // Raw task data
        addTask,     // Create operation
        updateTask,  // Update operation
        deleteTask   // Delete operation
    };
};

export default useTaskModel;