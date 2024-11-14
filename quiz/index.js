const corretAnswers = ["A", "A", "A", "A", "A",];
const form = document.querySelector(".quiz-form");
const result = document.querySelector(".result");
const questions = document.querySelectorAll(".question");

// console.log(questions[1]); // check all q are selected

form.addEventListener("submit", (event)=>{
    event.preventDefault();


    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value,];
    

    userAnswers.forEach( (answer, index)=> {
        if(answer == corretAnswers[index]){
            score += 1;
            questions[index].classList.add("correct")
        }else{
            questions[index].classList.add("wrong")
        }
    });

    scrollTo(0,0);  //  scrole to page top
    result.classList.remove("hide");
    result.querySelector("p").textContent = `Your scored ${score}/5`; // replacing text

});

function reloadPage(){
    location.reload();    // relord the page using button
}