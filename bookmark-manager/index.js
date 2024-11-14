
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, query, where} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
const firebaseConfig = {
apiKey: "AIzaSyAApQaX-t-he1VGihaZDMv-2scGqdMVWIw",
authDomain: "bookmark-9dcbc.firebaseapp.com",
projectId: "bookmark-9dcbc",
storageBucket: "bookmark-9dcbc.firebasestorage.app",
messagingSenderId: "580096028536",
appId: "1:580096028536:web:c2847a9951c1986c41e28d"
};


const app = initializeApp(firebaseConfig);
const db =getFirestore();
const colRef = collection(db, "bookmarks");

function deleteEvent(){
    const deleteBtns = document.querySelectorAll("i.delete");
deleteBtns.forEach(button => {
    button.addEventListener("click", event => {
        const deleteRef = doc(db, "bookmarks", button.dataset.id);
        deleteDoc(deleteRef)
            .then(() => {
                button.parentElement.parentElement.parentElement.remove();
            })
    });
})
}

function genarateTemplate(response,id){
    return `<div class="card">
                            <p class="title">${response.title}</p>
                            <div class="sub-information">
                                <p>
                                    <span class="category ${response.category}">${response.category[0].toUpperCase()}${response.category.slice(1)}</span>
                                </p>
                                <a href="${response.link}" target=""><i class="bi bi-box-arrow-up-right webiste"></i></a>
                                <a href="https://www.google.com/search?q=${response.title}" target=""><i class="bi bi-google search"></i></a>
                                <span><i class="bi bi-trash delete" data-id="${id}"></i></span>
                            </div>
                        </div`;
}

const cards = document.querySelector(".cards");
function showCard(){

    cards.innerHTML = "";

    getDocs(colRef)
    .then(data => {
        data.docs.forEach(document => {
            cards.innerHTML += genarateTemplate(document.data(), document.id);
        })
        deleteEvent();
    })
    .catch(error => {
        console.log(error);
    });
}  

showCard();

    
const addForm = document.querySelector(".add");
addForm.addEventListener("submit", event => {
    event.preventDefault();

    addDoc(colRef, {
        link: addForm.link.value,
        title: addForm.title.value,
        category: addForm.category.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addForm.reset();
        showCard();
    })
});


function filterCards(category){
    if(category === "All"){
        showCard();
    } else {
        const qRef = query(colRef, where("category", "==", category.toLowerCase()));

        cards.innerHTML = "";

        getDocs(qRef)
            .then(data => {
                data.docs.forEach(document => {
                    cards.innerHTML += genarateTemplate(document.data(), document.id);
                })
                deleteEvent();
            })
            .catch(error => {
                console.log(error);
            });
    }
  
}


const categoryList = document.querySelector(".category-list");
const categorySpan = document.querySelectorAll(".category-list span")
categoryList.addEventListener("click", event => {
    if(event.target.tagName === "SPAN"){
        filterCards(event.target.innerText);
        categorySpan.forEach(span => span.classList.remove("active"));
        event.target.classList.add("active");
    }
});