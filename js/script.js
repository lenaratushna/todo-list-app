const todoInput = document.querySelector('.todo-form__input'),
    todoBtn = document.querySelector('.todo-form__button'),
    todoList = document.querySelector('.todo__list');

document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

//Add new todo-list item
function addTodo(event) {
    //Cancel the default action 
    event.preventDefault(); 

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo__item');
    todoDiv.appendChild(newTodo);

    //Save to local storage
    saveLocalTodo(todoInput.value);

    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i></i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);

    todoInput.value = '';
}

//Delete todo-list item
function deleteCheck(event) {
    const item = event.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

//Save to local storage
function saveLocalTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Get todo-list items from local storage
function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo__item');
        todoDiv.appendChild(newTodo);

        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '<i class="fas fa-check"></i></i>';
        completeBtn.classList.add('complete-btn');
        todoDiv.appendChild(completeBtn);

        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn);

        todoList.appendChild(todoDiv);
    });
}

//Remove items from local storage
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}