import React from 'react';
import './styles/index.css';
import useTaskModel from './components/model/TaskModel';
import TaskController from './components/controller/TaskController';

function App() {
   // Create a single instance of the model that persists across renders
    const model = useTaskModel();

     // Render the Controller component with the model instance
    return (
        <TaskController model={model} />
    );
}

export default App;