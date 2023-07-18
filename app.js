const form = document.querySelector("#todo-form"); //

const todoInput = document.querySelector("#todo"); //

const todoList = document.querySelector(".list-group");

const firstCardBody = document.querySelectorAll(".card-body")[0];

const secondCardBody = document.querySelectorAll(".card-body")[1];

const filter = document.querySelector("#filter");

const clearButton = document.querySelector("#clear-todos");



eventListeners();







function eventListeners(){ // event listener atama kısmı

    form.addEventListener("submit",addTodo);

    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)

    secondCardBody.addEventListener("click",deleteTodo);

    filter.addEventListener("keyup",filterTodos);

    clearButton.addEventListener("click",clearAllTodos);

}


function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        //todoList.innerHTML = ""; 


        while(todoList.firstElementChild !=null){
            todoList.removeChild(todoList.firstElementChild);
           localStorage.removeItem("todos");
        }
        
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue)===-1){
            //bulamadı
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    })
}





function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){

        e.target.parentElement.parentElement.remove();

        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);



       





        showAlert("success","Silinme başarılı..")



    }

}



function deleteTodoFromStorage(deletetodo){

    let todos = getTodosFromStorage();



    todos.forEach(function(todo,index){

        console.log(todo,deletetodo,index)

        if (todo === deletetodo){

            todos.splice(index,1);

            console.log("Test");

        }



       





    });



    localStorage.setItem("todos",JSON.stringify(todos));

}



function loadAllTodosToUI(){

    let todos = getTodosFromStorage();

   

    todos.forEach(function(todo){

        addTodoUI(todo);

    })



}



function addTodo(e){

   

   

    const newTodo = todoInput.value.trim();

   



    if (newTodo === ""){

        showAlert("danger","Lütfen boş bırakmayın");       

    }

    else{

        addTodoUI(newTodo);

        addTodoStorage(newTodo);

        showAlert("success","Başarıyla eklendi");



    }



    e.preventDefault();

}

function getTodosFromStorage(){ // Storagedan Todoları Alma

    let todos;



    if (localStorage.getItem("todos") === null){

        todos = [];

    }

    else {

        todos = JSON.parse(localStorage.getItem("todos"));



    }

    return todos;





}

function addTodoStorage(newTodo){

    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}



function showAlert(type,message){

    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);



    // set timeout method

    setTimeout(function(){alert.remove();},1000);

    // 1000 ms eşittir 1 saniye

}















function addTodoUI(newTodo){ // alınan stringi list item türüne çevirecek.

    /*

    <li class="list-group-item d-flex justify-content-between">

                            Todo 1

                            <a href = "#" class ="delete-item">

                                <i class = "fa fa-remove"></i>

                            </a>



                        </li>

    */

   //list item oluşturma

   const listItem = document.createElement("li");



   //link oluşturma

   const link = document.createElement("a");

   link.href = "#";

   link.className = "delete-item";

   link.innerHTML = "<i class = 'fa fa-remove'></i>";



   listItem.className = "list-group-item d-flex justify-content-between";

   

   // Text Item

   listItem.appendChild(document.createTextNode(newTodo));

   listItem.appendChild(link);

   // Todo List'e Item'i Ekleme

   todoList.appendChild(listItem);

   todoInput.value = "";

}