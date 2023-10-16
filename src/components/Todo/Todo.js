import React, { useState } from 'react'
import './Todo.css';

import TodoHeader from '../TodoHeader/TodoHeader'
import TodoActions from '../TodoActions/TodoActions'
import TodoRender from '../TodoRender/TodoRender'
import { v4 as uuidv4 } from 'uuid';

const localData = localStorage.getItem('todos');
const initialTodos = localData ? JSON.parse(localData) : [];


const initialFormData = {
  isEdit: false,
  todoName: '',
  todoNote: '',
  isFinished: false,
  id: '',
  index: null
}

const getIsFinishedTodosCount = (todos) => todos.reduce((acc, curr) => {
  acc.total = todos.length;
  if (curr.isFinished) {
    acc.finished = acc.finished + 1;
  }
  return acc

}, { total: 0, finished: 0 })

const setFilteredTab = (tab, todos) => {
  if (tab === 0) {
    return todos;
  } else if (tab === 1) {
    return todos.filter((todo) => !todo.isFinished)
  } else if (tab === 2) {
    return todos.filter((todo) => todo.isFinished)

  }
}

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const Todo = () => {

  const [tab, setTab] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDisplayTodo, setIsOpenDisplayTodo] = useState(false)
  const [todos, setTodos] = useState(initialTodos)
  const [formData, setFormData] = useState(initialFormData)

  const totalCount = getIsFinishedTodosCount(todos)

  const sortedTodos = setFilteredTab(tab, todos)

  const resetAll = () => {
    setIsOpen(false);
    setIsOpenDisplayTodo(false);
    setFormData(initialFormData);
  }

  const handleOpenDialog = () => setIsOpen((prevState) => !prevState)

  const handleSetFieldValue = (fieldName, value) =>
    setFormData((prevState) => ({ ...prevState, [fieldName]: value }))

  const handleChangeTab = (tabValue) => setTab(tabValue)

  const handleSetTodoOnSubmit = (e) => {
    e.preventDefault();
    if (formData.isEdit) {
      const editedTodos = todos;
      editedTodos.splice(formData.index, 1, { ...formData, isEdit: false, index: null })
      setTodos(editedTodos)
      saveToLocalStorage('todos', editedTodos);

    } else {
      const newTodo = { ...formData, id: uuidv4() };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      saveToLocalStorage('todos', updatedTodos);

    }

    resetAll()
  }

  const handleMarkTodo = (isChecked, index) => {
    const updateTodos = todos.slice();
    updateTodos.splice(index, 1, { ...todos[index], isFinished: isChecked });
    setTodos(updateTodos)
    saveToLocalStorage('todos', updateTodos);

  }

  const handleOpenTodo = (todo) => {
    setIsOpenDisplayTodo(true);
    setFormData(todo)
  }

  const handleEditTodo = () => {
    setFormData((prevState) => ({ ...prevState, isEdit: true }));
    setIsOpenDisplayTodo(false);
    handleOpenDialog()
  }

  const handleRemoveTodo = () => {
    const updatedFilteredTodos = todos.filter((item) => item.id !== formData.id)
    setTodos(updatedFilteredTodos)
    saveToLocalStorage('todos', updatedFilteredTodos);

    resetAll()
  }



  return (
    <div className='todo-wrapper'>
      <TodoHeader
        handleOpenDialog={handleOpenDialog}
        isOpen={isOpen}
        handleSetFieldValue={handleSetFieldValue}
        formData={formData}
        handleSetTodoOnSubmit={handleSetTodoOnSubmit}
        handleEditTodo={handleEditTodo}
        isOpenDisplayTodo={isOpenDisplayTodo}
        handleRemoveTodo={handleRemoveTodo}
        handleCloseButton={resetAll}
        totalCount={totalCount}
      />
      <TodoActions handleChangeTab={handleChangeTab} tab={tab} />
      <TodoRender todos={sortedTodos}
        handleMarkTodo={handleMarkTodo}
        handleOpenTodo={handleOpenTodo}

      />
    </div>
  )
}

export default Todo;
