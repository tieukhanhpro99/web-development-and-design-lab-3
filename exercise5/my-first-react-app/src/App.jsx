
import TodoList from './TodoList';
import './App.css';

const sampleTodos = [
    { text: 'Learn JSX', completed: true },
    { text: 'Build a component tree', completed: false },
    { text: 'Meet useState next lab', completed: false },
];

function App() {
    return (
        <main className="todo-app">
            <h1>My Tasks</h1>

            <TodoList todos={sampleTodos} />
        </main>
    );
}

export default App;
