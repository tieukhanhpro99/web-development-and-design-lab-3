

function TodoItem({ todo }) {
    return (
        <li className={todo.completed ? 'completed' : ''}>
            <input
                type="checkbox"
                checked={todo.completed}
                readOnly
            />

            <span>{todo.text}</span>

            <button>✕</button>
        </li>
    );
}

export default TodoItem;
