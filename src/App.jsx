import React from 'react';
import './styles/index.css';
import useTaskModel from './components/model/TaskModel';
import useTaskViewModel from './components/viewmodel/TaskViewModel';
import TaskView from './components/view/TaskView';

// Root component - Assembles the MVVM pattern components
function App() {
    // Create the Model instance
    const model = useTaskModel();
    
    // Create the ViewModel instance, passing the model
    const viewModel = useTaskViewModel(model);

    // Render the View with the ViewModel
    return <TaskView viewModel={viewModel} />;
}

export default App;