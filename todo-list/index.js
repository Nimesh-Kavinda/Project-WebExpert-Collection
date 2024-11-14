//** Add task */

const addForm =document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span")
const serachForm = document.querySelector(".search");

//**Upatde task function */
function updateMessage(){
    const textLenght = tasks.children.length;
    messageSpan.textContent = `You have ${textLenght} pending tasks`;
}
updateMessage();

    addForm.addEventListener("submit", event => {
    event.preventDefault();
    const value = addForm.task.value.trim();
    
    if(value.length){

        tasks.innerHTML += ` <li>
                            <span>${value}</span>
                            <i class="bi bi-trash-fill delete"></i>
                            </li>`;

        addForm.reset();
        updateMessage();
    }

});
     //** Delete task */

tasks.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        updateMessage();
    }
});

    //** Clear All Task */
clearAll.addEventListener("click", event => {
    const taskItems = tasks.querySelectorAll("LI");
    taskItems.forEach(item => {
        item.remove();
    });
    updateMessage();
});


function filterTask(term){
    Array.from(tasks.children)
    .filter(task => {
         return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        task.classList.add("hide")
    });

    Array.from(tasks.children)
    .filter(task => {
        return task.textContent.toLowerCase().includes(term);
    })
    .forEach(task =>{
        task.classList.remove("hide");
    })
};

serachForm.addEventListener("keyup",event => {
   const term = serachForm.task.value.trim().toLowerCase();
    filterTask(term);
});

serachForm.addEventListener("click", event => {
    if(event.target.classList.contains("reset")){
        serachForm.reset();
        const term = serachForm.task.value.trim();
        filterTask(term);

    }
})

