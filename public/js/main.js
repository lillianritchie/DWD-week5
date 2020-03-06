//listen for when the DOM is loaded
window.addEventListener("DOMContentLoaded", async() => {
    //look up the list where our to-dos goes
    const todoItems = document.getElementById("todo-items");
    // fetch the todo items from our database
    // fetch("/api/v1/todos").then(res => res.json()).then((data) => {
    //     //add each todo to the list
    //     console.log(data)
    //     todoItems.innerHTML = listTodos(data);
    // })

    //get our result
    let data = await fetch("/api/v1/todos");
    //turn result into a json
    data = await data.json();
    //call todo items function
    todoItems.innerHTML = listTodos(data);

})

function listTodos(data) {
    const myListElements =[]
    for(let i =0; i <data.length; i++ ){
        let item = data[i];
        myListElements.push(`<li data-todo="${item.todo}">
                                <span class="todo-status">${item.status}</span>
                                <span>${item.todo}</span>
                                <button onclick="removeTodo"> delete it </button>
                            </li>`);
        
        //todoItems.append(todoItem);
    }
    return myListElements.join("");
    
    //console.log(HELP);
}