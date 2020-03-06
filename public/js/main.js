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
        let status;
        if(item.status == "not started"){
            status = "a";
        } else if( item.status == "in progress"){
            status = "b";
        } else if (item.status == "complete"){
            status = "c";
        } else {
            status = "d";
        }
        myListElements.push(`<li data-todo="${item.todo}">
                                <span class="status__${status}"> (${status}) </span>
                                <span>${item.todo}</span>
                                <button class="todo__delete"> delete it </button>
                            </li>`);
        
        //todoItems.append(todoItem);
    }
    return myListElements.join("");
    
    //console.log(HELP);
}
const $deleteButtons = document.querySelectorAll(".todo__delete");

$deleteButtons.forEach( item => {
    item.addEventListener("click", async(evt) => {
        console.log("trying to delete");
        try{
            const id = evt.target._id;
            await fetch (`/api/v1/todos/${id}`, {method: "DELETE"});
            console.log("delete successful");
        } catch(error){
            console.log("OH NO! Somethign is wrong");
        }
    }
    )
    
});