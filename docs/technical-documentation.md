# Technical Documentation

## Overview

The portfolio is a static website using HTML, CSS, and JavaScript.
It does not require a server-side application or database.

## HTML Structure

The page contains a header, navigation, main content, and footer.

The main content has three sections:
- About Me
- Projects
- Contact

Navigation links use section IDs.
Project images use relative file paths and descriptive alt text.
Form labels are connected to their inputs using matching for and id values.

## CSS and Responsive Design

The stylesheet is stored in css/styles.css.

Flexbox arranges the navigation and project cards.
The project container uses flex-wrap so cards can move onto
separate rows when the screen is narrow.

Each project uses flex: 1 1 300px, allowing it to grow or shrink
from a starting size of 300px.

The main content uses 90% width and a maximum width of 1000px.
Form fields use 100% width within their container.

Project images use object-fit: contain to preserve the full image.
Focus outlines help users navigate with a keyboard.

## JavaScript

### Time-Based Greeting

showGreeting() reads the visitor's local hour using the Date object.

- Before 12: morning greeting
- From 12 until before 18: afternoon greeting
- From 18 onward: evening greeting

The function updates the greeting paragraph when the page loads.

### Contact Form

HTML validates required fields and email formatting.

The JavaScript submit handler prevents normal submission.
It checks that the name and message are not only whitespace,
then displays feedback using textContent.

An input event handler clears old feedback when the form is edited.

## Performance

The site uses no external frameworks, packages, or web fonts.
CSS and JavaScript are stored in separate local files.

## Testing Results

All executed test cases passed successfully. The portfolio displayed correctly across the tested screen sizes and browsers, and navigation, images, greetings, and form validation worked as expected. No issues were observed during testing.

## Limitations

- The form does not send or store messages.
- The greeting relies on the visitor's device clock.
- The greeting updates on page load, not continuously.

## References
- Course slides: Ch.2_HTML, Ch.3_CSS, and Ch.4_JS