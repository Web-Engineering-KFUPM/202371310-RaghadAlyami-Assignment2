# AI Usage Report

I Raghad Alyami 202371310 declare on Monday 19th of OCT 2026 that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

## Tools Used and Use Cases

In Assignment 1 my AI report was too short and did not explain my process. For this assignment I used AI throughout the work and recorded what it suggested, what I decided, what I changed, and how the result was tested.

I used AI to:

- review my Assignment 1 code before starting
- generate two demo designs (expandable project cards and a quote widget)
- explain the code so I could understand and document it
- find problems I would not have noticed
- test the features at different screen sizes and in error situations.

## AI Tools Used

- Claude (Claude app) Claude Opus 5.5 and Chatgpt (GPT-6):	Code review, explanations, debugging a Git problem, automated browser tests, and first drafts of my documentation.

- Claude (Claude app)	Claude Opus 5.5:	Generating the two standalone reference designs: project-cards.html and quote-widget.html.

## Benefits and Challenges

- Claude found problems before they reached my site: cropped images, an empty grid column, and the .btn conflict between two features.

- It tested cases that are hard to create by hand – server errors, invalid API data, and being offline – by replacing the API with sample responses in a headless browser, at laptop and phone widths.

- It explained new concepts in simple terms, which helped me understand and document the code.

- The AI-assisted code is more advanced than my Assignment 1 code, so I had to study it before I could modify it.

## Learning Outcomes

- Event listeners and delegation: one click listener on .project-container handles every card. event.target.closest(".toggle-btn") finds which button was clicked, because click events "bubble" up from the button to its parent.

- DOM manipulation: setCardState() updates aria-expanded, the button text (textContent), the open class (classList.toggle), and inert in one place.

- CSS animation: height: auto cannot be animated, so the details panel animates grid-template-rows from 0fr to 1fr. The arrow rotates using the selector [aria-expanded="true"].

- Fetching data: async/await with fetch() waits for the API without freezing the page. fetch() does not fail on a 404 or 500, so the code checks response.ok and throws an error itself. try / catch / finally shows a friendly message on failure and clears the timer.

- Timeouts: an AbortController cancels the request after 8 seconds.

- Safe output: API text is inserted with textContent, not innerHTML, so it cannot inject HTML.

- Conditional logic: showState() uses comparisons like state !== "loading" to show exactly one of the loading, success, or error boxes.

- Git: nested repositories, .gitignore, and the difference between committing and pushing.

## Responsible Use and Modifications

I personalized the portfolio with my introduction, project information, and photographs. I reviewed the implementation, corrected errors with assistance, and tested the website’s layout and functionality.

## AI Usage log:
ID	Tool (model)	Date	Purpose	Files affected	What youchanged and how you verified it


| ID  | Tool (model)           | Date    | Purpose                                                                                               | Files affected                                                         | What you changed and how you verified it                                                                                                                                                                                                                                                |
| --- | ---------------------- | ------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01 | Claude (Opus 5.5) | 19/10/2026 | Review Assignment 2 requirements and choose an interactive feature.                                   | Planning only                                                          | Used the checklist and selected expand/collapse for project cards. Later decided to keep the Contact section visible. Verified the chosen feature against the assignment requirements.                                                                                                  |
| A02 | Claude (Opus 5.5) | 19/10/2026 | Generate a working reference for expandable project cards.                                            | `project-cards.html`, `index.html`, `css/styles.css`, `js/script.js`   | Adapted the reference to my existing Wasm and FPGA projects instead of using the three sample projects. Kept individual Show details buttons and Expand all/Collapse all. The updated HTML confirms the project-specific content and controls; browser testing is pending confirmation. |
| A03 | ChatGPT (GPT-6)        | 19/10/2026 | Help integrate the expand/collapse reference into my existing portfolio.                              | `index.html`, `js/script.js`, `css/styles.css`                         | Used the guidance to identify where to place the HTML, JavaScript, and CSS. Kept the existing About Me and Contact sections unchanged. Compared the updated project markup with the original portfolio; JavaScript behavior still needs final verification.                             |
| A04 | Claude (Opus 5.5) | 24/10/2026 | Create a quote feature using an external API, including loading and error handling.                   | `quote-widget.html`, `index.html`, `css/styles.css`, `js/script.js`    | Added the Quote of the Moment section using DummyJSON as the data source. The updated HTML includes the New quote button and separate loading, success, and error containers. Verified their presence in the HTML; API behavior in the final website is pending confirmation.           |
| A05 | ChatGPT (GPT-6)        | 24/10/2026 | Generate a README sample matching the updated Assignment 2 portfolio.                                 | `readme_sample.txt`, `README.md`                                       | Used the sample to document the expandable cards, quote feature, setup instructions, technologies, and limitations. Checked that the descriptions match the sections present in `index.html`.                                                                                           |
| A06 | ChatGPT (GPT-6)        | 24/10/2026 | Generate technical documentation for Assignment 2.                                                    | `technicalDocumentation_sample.txt`, `docs/technical-documentation.md` | Used the sample to describe the project structure, DOM manipulation, card controls, API data handling, accessibility, and testing. Compared the feature descriptions with the HTML. Actual test results remain pending.                                                                 |
| A07 | ChatGPT (GPT-6)        | 24/10/2026 | Review the assignment requirements and improve documentation coverage based on Assignment 1 feedback. | Planning, `README.md`, `docs/ai-usage-report.md`                       | Used the rubric guidance to identify documentation and AI-report requirements. The initial plan included filtering and a theme toggle, but the final HTML instead uses expandable cards and a quote widget. Verified the distinction by comparing the plan with the updated HTML.       |
