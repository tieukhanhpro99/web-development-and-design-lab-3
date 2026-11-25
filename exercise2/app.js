const STORAGE_KEY = 'todo-app-items';

const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const list = document.querySelector('#todoList');

const counter = document.querySelector('#todoCounter');

const filterButtons = document.querySelectorAll('.filter-btn');

// Load dữ liệu từ localStorage
let todos = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]'
);

// Trạng thái bộ lọc hiện tại
let currentFilter = 'all';


// 1. Lưu dữ liệu
function saveTodos() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(todos)
    );
}


// 2. Hiển thị danh sách
function renderTodos() {

    list.innerHTML = '';

    // Lọc dữ liệu dựa theo filter
    const visibleTodos = todos
        .map((todo, index) => ({ todo, index }))
        .filter(({ todo }) => {

            if (currentFilter === 'active') {
                return !todo.completed;
            }

            if (currentFilter === 'completed') {
                return todo.completed;
            }

            return true;
        });


    // Tạo từng phần tử HTML
    visibleTodos.forEach(({ todo, index }) => {

        const li = document.createElement('li');

        li.className = todo.completed ? 'completed' : '';

        // Checkbox
        const checkbox = document.createElement('input');

        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;

        // Nội dung công việc
        const span = document.createElement('span');

        span.textContent = todo.text;

        // Nút xóa
        const deleteBtn = document.createElement('button');

        deleteBtn.textContent = '✕';
        deleteBtn.className = 'delete-btn';

        // Xử lý checkbox
        checkbox.addEventListener('change', () => {

            todos[index].completed = checkbox.checked;

            saveTodos();
            renderTodos();

        });

        // Xử lý xóa
        deleteBtn.addEventListener('click', () => {

            todos.splice(index, 1);

            saveTodos();
            renderTodos();

        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);

    });


    // 3. Cập nhật số công việc chưa hoàn thành
    const activeCount = todos.filter(
        todo => !todo.completed
    ).length;

    counter.textContent = `${activeCount} tasks left`;


    // 4. Cập nhật nút filter đang được chọn
    filterButtons.forEach(button => {

        button.classList.toggle(
            'active',
            button.dataset.filter === currentFilter
        );

    });

}


// 5. Thêm công việc
form.addEventListener('submit', (e) => {

    e.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    todos.push({
        text: text,
        completed: false
    });

    saveTodos();

    renderTodos();

    input.value = '';

});


// 6. Xử lý filter
filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        currentFilter = button.dataset.filter;

        renderTodos();

    });

});


// Hiển thị lần đầu khi mở trang
renderTodos();