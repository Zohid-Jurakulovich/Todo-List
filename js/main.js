const elForm = document.querySelector(".form")
const elFormInput = document.querySelector(".form__input")
const elList = document.querySelector(".todo-list")
const elResultAll = document.querySelector(".results__all")
const elResultCompleted = document.querySelector(".results__completed")
const elResultUncompleted = document.querySelector(".results__uncompleted")
const elResults = document.querySelector(".results")

// console.log(elResultAll, elResultCompleted, elResultUncompleted);

const localTodos = JSON.parse(window.localStorage.getItem("list"));
const todos = localTodos || [];

renderTodos(todos, elList);

elList.addEventListener("click", evt => {
  if(evt.target.matches(".todo-list__btn")){
    
    const btnId = evt.target.dataset.todoId;
    
    const findIndexArr = todos.findIndex(todo =>todo.id == btnId);
    
    todos.splice(findIndexArr, 1);
    renderTodos(todos, elList);
    window.localStorage.setItem("list", JSON.stringify(todos))
  }else if (evt.target.matches(".todo-list__checkbox")) {
    const inputCheckedId = evt.target.dataset.todoId;
    
    const findElement = todos.find(todo => todo.id == inputCheckedId);
    
    findElement.isCompleted = !findElement.isCompleted;
    
    renderTodos(todos, elList);
    window.localStorage.setItem("list", JSON.stringify(todos))
  }
})





function renderTodos(arr, element) {
  
  element.innerHTML = "";
  
  const elAllResult = todos.length;
  
  console.log(elAllResult);
  
  elResultAll.textContent = elAllResult;
  
  const elCompleteResult = todos.filter(e => e.isCompleted === true).length;
  
  elResultCompleted.textContent = elCompleteResult;
  
  elResultUncompleted.textContent = elAllResult - elCompleteResult;
  
  arr.forEach(todo =>{
    
    const newContainer = document.createElement("div");
    const newItem = document.createElement("li");
    const newInput = document.createElement("input");
    const newBtn = document.createElement("button");
    // const newBookmarkBtn = document.createElement("button");
    
    
    
    
    
    newItem.textContent = todo.title;
    newItem.classList.add("todo-list__item");
    newContainer.classList.add("todo-list__element");
    newInput.type = "checkbox";
    newBtn.textContent = "Delete";
    newBtn.classList.add("todo-list__btn");
    newBtn.dataset.todoId = todo.id;
    // newBookmarkBtn.classList.add("todo-list__bookmark");
    newInput.dataset.todoId = todo.id;
    newInput.classList.add("todo-list__checkbox");
    
    
    if (todo.isCompleted) {
      newInput.checked = true;
      newItem.style.textDecoration = "line-through";
      // elResultCompleted.textContent++;
      // elResultUncompleted.textContent--;
    }
    
    newContainer.appendChild(newInput);
    newContainer.appendChild(newBtn);
    // newContainer.appendChild(newBookmarkBtn);
    newItem.appendChild(newContainer);
    
    element.appendChild(newItem);
  })
  
}




elForm.addEventListener("submit", evt =>{
  evt.preventDefault();
  
  const elInputValue = elFormInput.value.trim();
  
  if (elInputValue == ""|| Number(elInputValue)){
    alert("Please enter a task!");
    newItem.textContent = "";
    // elFormInput.value = "";
  }
  
  const todo = {
    id: todos.length > 0 ? todos[todos.length -1].id +1 : 1,
    title: elInputValue,
    isCompleted: false
  }
  todos.push(todo);
  
  renderTodos(todos , elList);
  
  window.localStorage.setItem("list", JSON.stringify(todos));
  
  
  elFormInput.value = "";
  
})


elResults.addEventListener("click", n => {
  if(n.target.matches(".results-all")){
    
    renderTodos(todos, elList)
    
  } if (n.target.matches(".results-completed")) {
    const completeFiltered = todos.filter(e => e.isCompleted === true)
    renderTodos(completeFiltered, elList)
  }if (n.target.matches(".results-uncompleted")) {
    const uncompleteFiltered = todos.filter(e => e.isCompleted === false)
    renderTodos(uncompleteFiltered, elList)
  }
})