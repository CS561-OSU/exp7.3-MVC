import { useMemo, useCallback } from 'react';

// ViewModel - Transforms Model data for the View and provides commands for UI interactions
// Acts as a data transformer and command center for the View
const useTaskViewModel = (model) => {
    // Computed property: Calculate statistics from raw task data
    // Updates automatically when tasks change
    const taskStats = useMemo(() => ({
        total: model.tasks.length,
        completed: model.tasks.filter(task => task.completed).length,
        pending: model.tasks.filter(task => !task.completed).length
    }), [model.tasks]);

    // Computed property: Transform tasks for display
    // Adds formatted date and sorts by creation time
    const displayTasks = useMemo(() => 
        model.tasks.map(task => ({
            ...task,
            // Add formatted date string for display
            formattedDate: new Date(task.createdAt).toLocaleDateString()
        }))
        // Sort tasks by creation date, newest first
        .sort((a, b) => b.createdAt - a.createdAt),
    [model.tasks]);

    // Commands object: Contains all possible UI actions
    // Each command is memoized to prevent unnecessary recreations
    const commands = {
        // Command to add a new task
        // Validates input before calling model
        addTask: useCallback((text) => {
            if (text.trim()) {
                model.addTask(text);
            }
        }, [model]),

        // Command to toggle task completion status
        // Finds task and updates its completed status
        toggleTask: useCallback((id) => {
            const task = model.tasks.find(t => t.id === id);
            if (task) {
                model.updateTask(id, { completed: !task.completed });
            }
        }, [model]),

        // Command to delete a task
        // Directly delegates to model's delete operation
        deleteTask: useCallback((id) => {
            model.deleteTask(id);
        }, [model])
    };

    // Public interface of the ViewModel
    return {
        taskStats,    // Computed statistics
        displayTasks, // Transformed task data
        commands      // UI commands
    };
};

export default useTaskViewModel;