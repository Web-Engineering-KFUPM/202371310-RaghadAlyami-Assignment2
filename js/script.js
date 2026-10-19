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

// ----- Expandable project cards -----

const projectGrid = document.querySelector(".project-container");
const toggleAllBtn = document.getElementById("toggle-all-btn");

// Opens or closes one card
function setCardState(button, shouldOpen) {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return; // safety check if an ID is mistyped

    button.setAttribute("aria-expanded", String(shouldOpen));
    button.querySelector(".toggle-label").textContent = shouldOpen ? "Hide details" : "Show details";
    panel.classList.toggle("open", shouldOpen);

    // Hidden content should not be reachable with the Tab key
    panel.inert = !shouldOpen;
}

// Updates the "Expand all / Collapse all" label to match the cards
function updateToggleAllLabel() {
    const buttons = projectGrid.querySelectorAll(".toggle-btn");
    const allOpen = [...buttons].every(btn => btn.getAttribute("aria-expanded") === "true");
    toggleAllBtn.textContent = allOpen ? "Collapse all" : "Expand all";
}

// Event delegation: one listener on the grid handles every card
projectGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".toggle-btn");
    if (!button) return; // the click was not on a toggle button

    const isOpen = button.getAttribute("aria-expanded") === "true";
    setCardState(button, !isOpen);
    updateToggleAllLabel();
});

// Expand all / Collapse all
toggleAllBtn.addEventListener("click", () => {
    const shouldOpen = toggleAllBtn.textContent === "Expand all";
    projectGrid.querySelectorAll(".toggle-btn").forEach(btn => setCardState(btn, shouldOpen));
    updateToggleAllLabel();
});

// Start with every card closed
projectGrid.querySelectorAll(".toggle-btn").forEach(btn => setCardState(btn, false));


