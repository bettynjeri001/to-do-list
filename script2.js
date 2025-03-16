let tasks=[]

let addTask = ()=>{
   let taskInput = document.getElementByIdI('taskInput')
   let text=taskInput.value.trim();

   if(text){
    tasks.push({text:text, completed: false });

    updateTasksList()

   }
};
let updateTasksList = () =>{
    let taskList = document.getElementById('task-list')
    taskList.innerHTML = "";
    tasks.forEach((task,index) =>{
        let listItem = document.createElement("li");

        listItem.innerHTML = 
        <div class = "taskItem">
            <div class="task">
                <input type="checkbox" class="checkbox" />
                <p>finish this project</p>
            </div>
            <div class="icons">
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-trash"></i>
            </div>
        </div> 
        ;
        listItem.addEventListener('change', () => toggleTaskComplete(index))
        taskList.append(listItem);
                
            
        
    });

};
document.getElementById('submit').addEventListener("click", function(e){
    e.preventDefault();

    addTask();
})
