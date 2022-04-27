let items = document.querySelectorAll('.item')
closeBtn = document.querySelector('.closeBtn')
newTodo = document.querySelector('.newTodo')
newTodoContainer = document.querySelector('.newTodoContainer')
todoData = document.querySelector('#todoData')
submitForm = document.querySelector('.submitForm')
todoList = document.querySelector('.todoList')

let todos = JSON.parse(localStorage.getItem('todo-data'))

newTodo.addEventListener('click', () => {
    newTodoContainer.classList.add('show')
    newTodoContainer.querySelector('.title').innerText = 'Add New Todo'
})

closeBtn.addEventListener('click', () => {
    newTodoContainer.classList.remove('show')
    todoData.value = ''
})


const showTodo = () => {
    let LI = ''
    if (todos) {
        todos.forEach((todo, index) => {
            let todoLiData = todo.data
            LI += `<div class="item">
            <div class="header">
            <span class="sNo">${index + 1}</span>
            <p class="todoTitle">${todoLiData}</p>
            </div>
            <div class="body">
            <div class="options">
            <button class="toggleBtn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
            <div class="optionDropdown">
            <div class="edit" data-editID="${index}" data-editData="${todo.data}"><i class="fa-solid fa-pencil"></i> <span>Edit</span></div>
            <div class="delete" onclick='deleteTodo(${index})'><i class="fa-solid fa-trash"></i> <span>Delete</span></div>
            </div>
                                </div>
                                </div>
                                </div>`
            console.log();
        })
    }
    todoList.innerHTML = LI || `<p class="noTodo">You don't have any task here.</p>`
}

showTodo()

let toggleBtns = document.querySelectorAll('.toggleBtn')
options = document.querySelectorAll('.options')

const optionsToggle = () => {
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.path[3].classList.toggle('active')
        })
    })

    document.addEventListener('click', (e) => {
        options.forEach(option => {
            if (e.target.contains(option)) {
                document.querySelectorAll('.item').forEach(item => {
                    item.classList.remove('active')
                })
            }
        })
    })
}
optionsToggle()

let todoEditID,
    edit = document.querySelectorAll('.edit')
isEditTodo = false

edit.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let id = e.target.dataset.editid
        let editdata = e.target.dataset.editdata
        isEditTodo = true
        todoEditID = id
        newTodoContainer.classList.add('show')
        newTodoContainer.querySelector('.title').innerText = 'Edit Todo'
        todoData.value = editdata
    })
})

const deleteTodo = (id) => {
    todos.splice(id, 1)
    localStorage.setItem('todo-data', JSON.stringify(todos))
    showTodo()
    location.reload()
}

submitForm.addEventListener('click', () => {
    let textareaData = todoData.value.trim()
    if (textareaData != '') {
        if (!isEditTodo) {
            todos = !todos ? [] : todos
            let taskData = { data: textareaData }
            todos.push(taskData)
        } else {
            console.log(todos);
            isEditTodo = false
            todos[todoEditID].data = textareaData
        }
    }
    localStorage.setItem('todo-data', JSON.stringify(todos))
    todoData.value = ''
    newTodoContainer.classList.remove('show')
    location.reload()
})