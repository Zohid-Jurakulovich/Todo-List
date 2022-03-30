const elForm = document.querySelector(".form")
const elFormInput = document.querySelector(".form__input")
const elList = document.querySelector(".todo-list")
const elResultAll = document.querySelector(".results__all")
const elResultCompleted = document.querySelector(".results__completed")
const elResultUncompleted = document.querySelector(".results__uncompleted")

// console.log(elResultAll, elResultCompleted, elResultUncompleted);

const todos = [];

elList.addEventListener("click", evt => {
  if(evt.target.matches(".todo-list__btn")){
    
    const btnId = evt.target.dataset.todoId;
    
    const findIndexArr = todos.findIndex(todo =>todo.id == btnId);
    
    todos.splice(findIndexArr, 1);
    renderTodos(todos, elList);
  }else if (evt.target.matches(".todo-list__checkbox")) {
    const inputCheckedId = evt.target.dataset.todoId;
    
    const findElement = todos.find(todo => todo.id == inputCheckedId);
    
    findElement.isCompleted = !findElement.isCompleted;
    
    renderTodos(todos, elList);
  }
})





function renderTodos(arr, element) {
  
  element.innerHTML = "";

  elResultAll.textContent = arr.length;
  elResultCompleted.textContent = 0;
  elResultUncompleted.textContent = arr.length;
  
  arr.forEach(todo =>{
    
    const newItem = document.createElement("li");
    const newInput = document.createElement("input");
    const newBtn = document.createElement("button");
    
    
    
    
    
    newItem.textContent = todo.title;
    newItem.classList.add("todo-list__item");
    newInput.type = "checkbox";
    newBtn.textContent = "Delete";
    newBtn.classList.add("todo-list__btn");
    newBtn.dataset.todoId = todo.id;
    newInput.dataset.todoId = todo.id;
    newInput.classList.add("todo-list__checkbox");
    
    
    if (todo.isCompleted) {
      newInput.checked = true;
      newItem.style.textDecoration = "line-through";
      elResultCompleted.textContent++;
      elResultUncompleted.textContent--;
    }
    
    
    newItem.appendChild(newInput);
    newItem.appendChild(newBtn);
    
    element.appendChild(newItem);
  })
  
}




elForm.addEventListener("submit", evt =>{
  evt.preventDefault();
  
  const elInputValue = elFormInput.value.trim();
  
  if (elInputValue == ""|| Number(elInputValue)){
    alert("Please enter a task!");
    newItem.textContent = "";
  }
  
  const todo = {
    id: todos.length > 0 ? todos[todos.length -1].id +1 : 1,
    title: elInputValue,
    isCompleted: false
  }
  todos.push(todo);
  
  renderTodos(todos , elList)
  
  // console.log(todos);
  elFormInput.value = "";
  
})