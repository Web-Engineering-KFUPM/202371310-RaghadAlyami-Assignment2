# Technical Documentation – Assignment 2

**Student:** Raghad Alyami (202371310)
**Course:** SWE363 – Web Development
**Assignment:** Assignment 2 – Interactive Features

## 1. Project Overview

This project is an improved version of my personal portfolio website from Assignment 1. The main objective is to add interactive features using JavaScript and improve the overall user experience.

In Assignment 1, I created the basic portfolio structure with an About Me section, project cards, a dynamic greeting, and a contact form.

For Assignment 2, I added:

1. **Expandable project cards** – dynamic content that changes when the visitor clicks.
2. **Quote of the Moment** – data retrieved from a public API, with loading and error states.

Both features also add animations and transitions. The website is a static single page built with HTML, CSS, and vanilla JavaScript. It needs no server, database, build step, or frontend framework.

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structures the portfolio sections, project cards, buttons, and form |
| CSS3 | Layout (Grid, Flexbox), custom properties, transitions, keyframe animations, responsive design |
| JavaScript | Handles user interactions and dynamic content |
| DOM API | Accesses and updates HTML elements |
| Fetch API | Requests quote data from an external API |
| DummyJSON | Provides the quotes used in the Quote of the Moment section (free, no API key) |

## 3. Project Structure

| File | Purpose |
|---|---|
| `index.html` | Page structure: header with navigation, About Me, Projects, Quote of the Moment, Contact, footer |
| `css/styles.css` | Variables, layout, card and quote styles, animations, reduced-motion rules |
| `js/script.js` | Four parts, in order: greeting, contact form, project cards, quote API |
| `assets/images/` | `Wasm.jpeg` (≈324 KB) and `pedestrian-light.jpeg` (≈236 KB) |
| `README.md` | Explains the project and how to run it |
| `docs/ai-usage-report.md` | Documents AI assistance |
| `docs/technical-documentation.md` | Explains the implementation and testing |


## 4. Website Implementation

### 4.1 About Me and Dynamic Greeting

The About Me section introduces my background and interests in Computer Science and software development.

The greeting feature was implemented in Assignment 1 and is kept in Assignment 2. `showGreeting()` uses the `Date` object and `getHours()` to read the visitor's local time. Conditional statements select the greeting (morning before 12, afternoon before 18, evening otherwise), and it is displayed by updating the `textContent` of the element with the ID `greeting`.

### 4.2 Interactive Project Cards

One of the main improvements in Assignment 2 is the expandable project cards. The Projects section contains two projects:

1. Wasm – Creative Services App (Figma)
2. FPGA Pedestrian Light (Verilog, FPGA board)

Each card displays an image, project title, and short summary. The tools used and the full description are placed inside a collapsible details section.

- `aria-controls="details-1"` connects the button to its details container. JavaScript reads this attribute to find the right panel, so the same code works for any number of cards (each ID must be unique).
- `aria-expanded` stores the current state and lets screen readers announce "expanded" or "collapsed".

#### Expand and Collapse Behavior

All opening and closing goes through one function:

```js
function setCardState(button, shouldOpen) {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;

    button.setAttribute("aria-expanded", String(shouldOpen));
    button.querySelector(".toggle-label").textContent = shouldOpen ? "Hide details" : "Show details";
    panel.classList.toggle("open", shouldOpen);
    panel.inert = !shouldOpen;
}
```

- `classList.toggle("open", shouldOpen)` adds the `open` class when `shouldOpen` is `true` and removes it when `false`.
- The button label switches between Show details and Hide details.
- `panel.inert = true` makes a closed panel unreachable with the Tab key and hidden from screen readers.
- **Event delegation:** instead of one listener per button, one `click` listener on `.project-container` handles all cards. `event.target.closest(".toggle-btn")` finds the button even if the visitor clicked the text or arrow inside it. If the click was not on a toggle button, the function returns.
- When the page loads, every card is set to closed, which also sets `inert` correctly.


#### Expand All / Collapse All

The **Expand all** button at the top of the Projects section controls both cards at the same time. Its listener calls `setCardState()` for every card with the same value.

`updateToggleAllLabel()` uses `[...buttons].every(...)` to check whether **all** cards are open. If they are, the label becomes Collapse all; otherwise it is Expand all. This also updates correctly when the visitor opens the cards one by one.

#### Animation

`height: auto` cannot be animated directly. Instead, the details container is a one-row grid whose row animates from `0fr` (no height) to `1fr` (full content height):

```css
.card-details {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition: grid-template-rows var(--speed) ease, opacity var(--speed) ease;
}

.card-details.open {
    grid-template-rows: 1fr;
    opacity: 1;
}

.card-details-inner {
    overflow: hidden; /* hides the content while the row is 0fr */
}
```

- **Arrow:** a small square with two borders, rotated 45°. The selector `.toggle-btn[aria-expanded="true"] .chevron` rotates it to −135°, so the arrow flips when the card opens. The CSS reacts directly to the ARIA state.
- **Hover:** cards rise 3px with a soft shadow (`transform` + `box-shadow` transition).
- **Layout:** `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` gives two columns on a laptop and one on a phone without a media query. `align-items: start` lets an opened card grow without stretching the other card.
- **Images:** `height: 280px; object-fit: contain` shows the full photo without cropping.

These effects need no external animation library.

### 4.3 Quote of the Moment

This section retrieves inspirational quotes from the DummyJSON Quotes API.

- Endpoint: `GET https://dummyjson.com/quotes/random`
- Documentation: https://dummyjson.com/docs/quotes
- Response example: `{ "id": 12, "quote": "…", "author": "…" }`

A quote loads automatically when the page opens, and the **New quote** button loads another one.

#### HTML – three states

```html
<div id="quote-status" aria-live="polite">
    <div class="quote-loading" id="quote-loading" hidden> spinner + "Loading a quote…" </div>
    <figure class="quote-content" id="quote-content" hidden> blockquote + figcaption </figure>
    <div class="quote-error" id="quote-error" role="alert" hidden> message </div>
</div>
<button type="button" class="btn btn-primary" id="new-quote-btn">New quote</button>
```

Only one state is visible at a time. The quote uses a `<blockquote>` and the author a `<figcaption>`.

#### API Data Handling

```
loadQuote()
  ├─ showState("loading")          spinner on, button disabled
  ├─ start 8-second timeout        AbortController
  ├─ try
  │   ├─ fetch(QUOTE_API_URL)      (up to 2 tries if the same quote id comes back)
  │   ├─ if !response.ok → throw   HTTP errors like 404 / 500
  │   ├─ response.json()
  │   ├─ check quote and author are strings, else throw
  │   ├─ textContent = quote / author
  │   └─ showState("success") + replay fade-in
  ├─ catch
  │   ├─ console.error(...)
  │   ├─ getFriendlyErrorMessage(error)
  │   └─ showState("error")        button text becomes "Try again"
  └─ finally: clearTimeout(...)
```

The main concepts involved are:

- **`fetch()` with `async` / `await`:** sends the HTTP request and waits for the reply without freezing the page.
- **`response.ok`:** `fetch()` only fails by itself when there is no network. A 404 or 500 response still "succeeds", so the code checks `response.ok` and throws an `Error` manually.
- **`response.json()`:** converts the reply into a JavaScript object with `data.quote` and `data.author`.
- **Response validation:** `typeof data.quote !== "string"` catches an unexpected response format.
- **No repeats:** `lastQuoteId` stores the id of the quote on screen; if the API returns the same id, it tries once more.
- **Security:** the quote is inserted with `textContent`, not `innerHTML`, so text from the API cannot inject HTML into the page.
- **Quotation marks and "— "** are added with CSS `::before` / `::after`, not JavaScript.

#### Loading State

`showState("loading")` shows the spinner and "Loading a quote…" (`#quote-loading`) and disables the button, so the visitor cannot send many requests at once. This is important because API requests may take time depending on the network connection.

`showState()` sets `hidden` on the three boxes with comparisons such as `quoteLoading.hidden = state !== "loading"`, which gives `true` or `false` directly.

#### Success State

The quote and author are placed in `#quote-text` and `#quote-author`, `#quote-content` is shown, and the fade-in animation is replayed.

#### Error State and Timeout

An `AbortController` cancels the request if it takes more than 8 seconds: `setTimeout(() => controller.abort(), 8000)`. Aborting makes `fetch` fail with an `AbortError`. The `finally` block clears the timer whether the request succeeded or failed.

If anything fails, `getFriendlyErrorMessage()` chooses a message and the button changes to **Try again**:

| Situation | How it is detected | Message |
|---|---|---|
| No internet | `navigator.onLine` is `false` | "You seem to be offline. Check your internet connection, then press "Try again"." |
| Too slow (> 8 s) | `error.name === "AbortError"` | "The quote service took too long to respond. Press "Try again" in a moment." |
| Server error / bad data | anything else | "The quote service is not available right now. Press "Try again", or check back later." |

Each message tells the visitor **what happened** and **what to do next**, instead of leaving them without feedback.

#### Animations

- **Spinner:** `@keyframes spin` rotates a circle with one colored border.
- **Fade-in:** `@keyframes fadeIn` (opacity 0 → 1, moves up 8px). To replay it for every new quote, the class is removed, `void element.offsetWidth` forces the browser to apply that change, and then the class is added again.
- **Button:** hover color change and a small press effect (`transform: scale(0.97)`).

### 4.4 Contact Form

The Contact section contains three input fields: Name, Email, and Message.

- HTML attributes `required` and `type="email"` provide basic validation.
- The submit event is handled with `addEventListener()`, and `preventDefault()` stops the normal page submission.
- The JavaScript validation from Assignment 1 checks the name and message after removing spaces with `trim()`, so input made of spaces only is rejected.
- When the entries are valid, a confirmation message is displayed in `#form-feedback` using `textContent`.
- An `input` listener clears old feedback when the visitor edits the form.

The form is only a demonstration. It does not connect to a backend, send emails, or store messages.

## 5. User Experience and Accessibility

### Navigation

The navigation bar links to About Me, Projects, Quote, and Contact using section IDs, so visitors can jump directly to each part of the page.


### Accessibility

- All interactive controls are real `<button type="button">` elements, so Tab, Enter, and Space work automatically.
- `:focus-visible` shows a 3px outline on buttons for keyboard users.
- `aria-expanded` and `aria-controls` describe the relationship between project buttons and their content.
- `inert` hides closed card panels from keyboard and screen-reader users.
- `aria-live="polite"` announces new quotes; `role="alert"` announces errors immediately; the decorative arrow and spinner use `aria-hidden`.
- `@media (prefers-reduced-motion: reduce)` turns off the card, arrow, hover, spinner, fade-in, and button animations for visitors who prefer less motion.
- Project images have alternative text, and form labels are linked to their inputs with `for` / `id`.

## 6. Testing

### 6.1 Method

- **Manual testing in the browser** using DevTools: the **Console** for errors, the **Network** tab set to *Offline* to test API failures, and a narrow window / device mode for phone width.
- **Automated checks during development**, run by Claude in headless Chromium at 1100px and 390px widths. The API was replaced by sample responses to simulate success, a server error, invalid data, and being offline.

### 6.2 Test Cases

| # | Test Case | Expected Result | Actual Result |
|---|---|---|---|
| 1 | Open the website | All sections appear; cards closed; a quote loads | Pass |
| 2 | Dynamic greeting | Greeting matches the visitor's local time | Pass |
| 3 | Show project details | Selected card expands, arrow flips, label "Hide details" | Pass |
| 4 | Hide project details | Selected card collapses | Pass |
| 5 | Open both cards one by one | Header button changes to "Collapse all" | Pass |
| 6 | Collapse all / Expand all | Both cards close / open, label updates | Pass |
| 7 | Keyboard: Tab to a card button + Enter | Card toggles | Pass |
| 8 | Keyboard: Tab while a card is closed | Hidden content is skipped (`inert`) | Pass |
| 9 | New quote button | Spinner, then a different quote with fade-in | Pass |
| 10 | API server error (500) | Error box, button "Try again" | Pass |
| 11 | API invalid response | "Service not available" message | Pass |
| 12 | Offline (DevTools → Network → Offline) | "You seem to be offline…" message | Pass |
| 13 | Back online + Try again | Quote loads, button "New quote" | Pass |
| 14 | Empty contact form | Browser asks to fill the required field | Pass |
| 15 | Whitespace-only name or message | "Please enter a name and message, not just spaces." | Pass |
| 16 | Valid contact form | "Thank you, [name]! Your entries are valid." | Pass |
| 17 | Mobile screen (390px) | One column, readable, no horizontal scrolling | Pass |
| 18 | Console | No JavaScript errors (only the logged quote error in tests 10–12) | Pass |

Tested in: Microsoft Edge on Windows


## 7. Performance and Compatibility

- Only two local code files (one CSS, one JS) and two images (under 600 KB in total); no frameworks, fonts, or libraries.
- Only `transform`, `opacity`, and grid rows are animated, which are cheap for the browser to draw.
- One click listener handles all project cards (event delegation) instead of one per card.
- The API is called once on page load and then only when the visitor asks; the button is disabled during a request.
- The card grid uses `auto-fit` + `minmax(300px, 1fr)`; the navigation and quote buttons use `flex-wrap`; `main` is 90% wide with a 1000px maximum.
- All features use standard HTML, CSS, and JavaScript supported by current versions of Chrome, Edge, Firefox, and Safari. The grid row animation and `inert` need browsers from 2023 or later.

## 8. Limitations

- The contact form is a demonstration and does not send messages.
- The Quote of the Moment feature needs an internet connection and depends on DummyJSON being available.
- Only two projects are currently displayed. Project content is written in the HTML, so adding a project means copying an `<article>` block and giving it a new unique `details-N` ID.


## 9. Conclusion

Assignment 2 improves my original portfolio by adding interactive project cards and external API data handling.

The project demonstrates how JavaScript can respond to user actions, update page content, and communicate loading and error states. It also gave me practice with DOM manipulation, event delegation, asynchronous requests with error handling, CSS transitions and animations, and accessibility.

These features make the portfolio more interactive while keeping the implementation organized and understandable.

## 10. References

- Course slides: Ch.2 HTML, Ch.3 CSS, Ch.4 JS
- MDN Web Docs – Fetch API, AbortController, `inert`, ARIA
- DummyJSON Quotes API – https://dummyjson.com/docs/quotes
- Claude (Claude Opus 5.5): Artifacts used for the two features and modified (`project-cards.html`, `quote-widget.html`)