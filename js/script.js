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

// ----- Quote of the Moment (public API) -----

const QUOTE_API_URL = "https://dummyjson.com/quotes/random";
const REQUEST_TIMEOUT_MS = 8000; // give up after 8 seconds

const quoteLoading = document.getElementById("quote-loading");
const quoteContent = document.getElementById("quote-content");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const quoteError = document.getElementById("quote-error");
const quoteErrorMsg = document.getElementById("quote-error-message");
const newQuoteBtn = document.getElementById("new-quote-btn");

let lastQuoteId = null; // used to avoid showing the same quote twice in a row

// Shows exactly one of the three states: "loading", "success" or "error"
function showState(state) {
    quoteLoading.hidden = state !== "loading";
    quoteContent.hidden = state !== "success";
    quoteError.hidden = state !== "error";

    // Disable the button while a request is running so users can't spam it
    newQuoteBtn.disabled = state === "loading";
    newQuoteBtn.textContent = state === "error" ? "Try again" : "New quote";
}

// Turns a technical error into a message that tells the user
// what happened and what to do next
function getFriendlyErrorMessage(error) {
    if (!navigator.onLine) {
        return "You seem to be offline. Check your internet connection, then press \"Try again\".";
    }
    if (error.name === "AbortError") {
        return "The quote service took too long to respond. Press \"Try again\" in a moment.";
    }
    return "The quote service is not available right now. Press \"Try again\", or check back later.";
}

// Fetches a random quote from the API and displays it
async function loadQuote() {
    showState("loading");

    // AbortController lets us cancel the request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        let data;
        // Try up to 2 times to get a quote different from the current one
        for (let attempt = 0; attempt < 2; attempt++) {
            const response = await fetch(QUOTE_API_URL, { signal: controller.signal });

            // fetch() only rejects on network failure, so HTTP errors (404, 500...) must be checked manually
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            data = await response.json();
            if (data.id !== lastQuoteId) break;
        }

        // Make sure the response has the fields we expect
        if (!data || typeof data.quote !== "string" || typeof data.author !== "string") {
            throw new Error("Unexpected response format");
        }

        // textContent (not innerHTML) so API text can never inject HTML into the page
        quoteText.textContent = data.quote;
        quoteAuthor.textContent = data.author;
        lastQuoteId = data.id;

        showState("success");

        // Restart the fade-in animation for every new quote
        quoteContent.classList.remove("fade-in");
        void quoteContent.offsetWidth; // forces the browser to reset the animation
        quoteContent.classList.add("fade-in");

    } catch (error) {
        console.error("Quote request failed:", error);
        quoteErrorMsg.textContent = getFriendlyErrorMessage(error);
        showState("error");
        quoteError.classList.remove("fade-in");
        void quoteError.offsetWidth;
        quoteError.classList.add("fade-in");
    } finally {
        clearTimeout(timeoutId);
    }
}

newQuoteBtn.addEventListener("click", loadQuote);

// Load the first quote when the page opens
loadQuote();
