//** Add transaction */

const form = document.querySelector(".add");
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");
const erroMessage = document.querySelector(".erromsg");

const balance = document.querySelector("#balane");
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");

let transactions = localStorage.getItem("transactions") !== null ? JSON.parse(localStorage.getItem("transactions")) : [];


function updateStatistics(){
    const updatedIncome = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((total, transaction) => total += Number(transaction.amount), 0)


    const updatedExpense = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((total, transaction) => total += Math.abs(Number(transaction.amount)), 0)

    income.textContent = updatedIncome;
    expense.textContent = updatedExpense;
    balance.textContent = updatedIncome - updatedExpense;


}

function genarateTemplate(id, source, amount, time){
    return `<li data-id="${id}">
                                <p>
                                    <span>${source}</span>
                                    <span id="time">${time}</span>
                                </p>
                                $<span>${Math.abs(amount)}</span> 
                                <i class="bi bi-trash-fill delete"></i>
                            </li>`
}

function addTransactionDOM(id, source, amount, time){
    if(amount > 0){
        incomeList.innerHTML += genarateTemplate(id, source, amount, time);
    }else{
        expenseList.innerHTML += genarateTemplate(id, source, amount, time);
    }
};


function addTransaction(source, amount){
    const time = new Date();
    const transaction = {
        id:Math.floor(Math.random()*10000),
        source: source,
        amount: amount,
        time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`
    };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    addTransactionDOM(transaction.id, source, amount, transaction.time);
};




form.addEventListener("submit", event =>{
    event.preventDefault();

    if(form.source.value.trim() === "" || form.amount.vlaue === ""){
       return erroMessage.innerText = "Please add Proper Values..!";
    }
    
    addTransaction(form.source.value.trim(), Number(form.amount.value));
    updateStatistics(); 
    erroMessage.innerText = "";
    form.reset();
  
});

function getTaransactions(){ 
    transactions.forEach(transaction => {
        if(transaction.amount > 0){
            incomeList.innerHTML += genarateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
        }else{
            expenseList.innerHTML += genarateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
        }
    });
}


function deletTransaction(id){
    transactions = transactions.filter(transaction => {
        return transaction.id !== id;
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
     updateStatistics(); 

}


incomeList.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        deletTransaction(Number(event.target.parentElement.dataset.id));
         updateStatistics(); 

    }
});

expenseList.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        deletTransaction(Number(event.target.parentElement.dataset.id));
        updateStatistics(); 

    }
});

function init(){
    getTaransactions();
    updateStatistics(); 
}

init(); 