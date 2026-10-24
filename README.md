# 202371310-RaghadAlyami-Assignment2

Personal portfolio website for **SWE363 – Web Engineering, Assignment 2 (Interactive Features)**.
This assignment builds on my [Assignment 1 portfolio](https://github.com/Web-Engineering-KFUPM/202371310-RaghadAlyami-Assignment1) and makes it more interactive.

## Project Description

A responsive single-page portfolio that introduces me, presents my projects, shows a live quote from a public API, and includes a demonstration contact form.
It is a static website built with HTML, CSS, and vanilla JavaScript – no frameworks, libraries, or build tools.

## What's New Since Assignment 1

| Area | Assignment 1 | Assignment 2 |
| Projects | Static cards with full text | Expandable cards with a summary, **Show details** button, tool tags, and **Expand all / Collapse all** |
| Data | None | **Quote of the Moment** fetched live from the DummyJSON public API |
| Feedback | Form message only | Loading spinner, friendly error messages, **Try again** button |
| Animation | None | Smooth expand/collapse, rotating arrow, card hover lift, quote fade-in |
| Styling | Hardcoded colors | New color theme and CSS custom properties (`--accent`, `--card`, …) |
| Accessibility | Labels and alt text | `aria-expanded`, `aria-controls`, `aria-live`, `inert`, focus outlines, reduced-motion support |

## Features

- **Time-based greeting** – greets the visitor with good morning / afternoon / evening (from Assignment 1).
- **Expandable project cards** – each card shows a short summary; **Show details** reveals the tools used and a full description with a smooth animation. **Expand all** opens or closes every card at once.
- **Quote of the Moment** – loads a random quote from a public API when the page opens; **New quote** loads another one.
  - Loading state with a spinner
  - Friendly error messages (offline, slow response, service unavailable) and a **Try again** button
  - Avoids showing the same quote twice in a row
- **Contact form** – checks that the fields are not empty or only spaces and shows feedback. It is a demonstration form: messages are **not** sent or stored.
- **Responsive layout** – cards stack into one column on small screens.
- **Keyboard and screen-reader friendly** – all controls are real buttons, show a focus outline, and announce their state.

## Technologies

- HTML5
- CSS3 (Grid, Flexbox, custom properties, transitions, keyframe animations, media queries)
- Vanilla JavaScript (DOM manipulation, event listeners, `fetch`, `async`/`await`, `AbortController`)
- [DummyJSON Quotes API](https://dummyjson.com/docs/quotes) – free, no API key

## Folder Structure

```
202371310-RaghadAlyami-Assignment2/
├── README.md
├── index.html                  # page structure and content
├── css/
│   └── styles.css              # layout, colors, animations, responsive rules
├── js/
│   └── script.js               # greeting, contact form, project cards, quote API
├── assets/
│   └── images/                 # project photos
├── docs/
│   ├── ai-usage-report.md      # detailed AI usage report and declaration
│   └── technical-documentation.md
└── .gitignore
```

## Setup – Run Locally

No installation is needed.

1. **Get the code**, either:
   - Clone it:
     ```
     git clone https://github.com/Web-Engineering-KFUPM/202371310-RaghadAlyami-Assignment2.git
     ```
   - or on GitHub select **Code → Download ZIP** and extract it.
2. **Open the folder** `202371310-RaghadAlyami-Assignment2`.
3. **Open `index.html`** in a modern browser (Chrome, Edge, Firefox, or Safari) – double-click it, or right-click → *Open with*.
4. **Stay online** – the Quote of the Moment section needs an internet connection. Everything else works offline.

To edit the site, open the folder in VS Code, save your changes, and refresh the browser.

## How to Use

- Use the navigation bar to jump to **About Me**, **Projects**, **Quote**, or **Contact**.
- **Projects:** select **Show details** on a card to see its tools and description; select **Hide details** to close it. Use **Expand all / Collapse all** in the section header for all cards.
- **Quote:** a quote loads automatically. Select **New quote** for another. If it fails, read the message and select **Try again**.
- **Contact:** fill in Name, Email, and Message and select **Send Message**. The form checks your entries and shows feedback, but does not send anything.
- **Keyboard:** press **Tab** to move between buttons and links, and **Enter** or **Space** to activate them.

## Testing Summary

Full test cases and results are in the [technical documentation](docs/technical-documentation.md#testing).

- Project cards: open/close, Expand all/Collapse all label, keyboard control, stacking on phone width ✔
- Quote API: loading, new quote, server error, invalid response, offline, recovery with Try again ✔
- Greeting and contact form still work as in Assignment 1 ✔
- No JavaScript console errors ✔

## Browser Compatibility

Uses only standard features supported by current versions of Chrome, Edge, Firefox, and Safari (desktop and mobile).
The smooth card animation uses CSS grid `grid-template-rows` transitions and the `inert` attribute, which are supported in all current major browsers (2023 and later).

## AI Use (summary)

I used Claude (Claude Opus 5.5) and ChatGpt (GPT-6) to inspect my Assignment 1 code, adapt two reference designs (expandable cards and a quote widget) to my site, explain the code, and test it.
I reviewed and edited the output myself, including my own color theme, and tested the features in the browser.
All AI use, the Usage Log, and my declaration are in the **[AI usage report](docs/ai-usage-report.md)**.

## Documentation

- [Technical documentation](docs/technical-documentation.md)
- [AI usage report](docs/ai-usage-report.md)

## Known Limitations

- The contact form does not send or store messages.
- The quote section needs an internet connection and depends on the DummyJSON service being available.
- The greeting uses the visitor's device clock and updates only when the page loads.

## Future Improvements

- Connect the contact form to a real email service.
- Add more projects and a filter by category.

## Author

Raghad Alyami – 202371310 – KFUPM