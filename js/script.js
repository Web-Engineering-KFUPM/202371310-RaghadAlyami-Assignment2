function showGreeting() {
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let greeting;

    if (hour<12){
        greeting = "Good Morning! Welcome to my portfolio.";
    }
    else if (hour<18){
        greeting = "Good afternoon! Welcome to my portfolio.";
    }
    else{
       greeting = "Good evening! Welcome to my portfolio."; 
    }

    document.getElementById("greeting").textContent=greeting;
}

showGreeting();

let contactForm = document.getElementById("contact-form");
let feedback = document.getElementById("form-feedback");

function checkMessage(event){
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === ""|| message === ""){
        feedback.textContent=
        "Please enter a name and message, not just spaces.";
        return;
    }

    feedback.textContent=
    "Thank you, " + name +
    "! Your entries are valid.";
}

contactForm.addEventListener("submit",checkMessage);

contactForm.addEventListener("input",function() {
    feedback.textContent="";
});
