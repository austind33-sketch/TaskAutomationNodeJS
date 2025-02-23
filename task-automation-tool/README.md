# Task Automation Tool

## Overview

This project is a web application designed to help users schedule and automate repetitive tasks. As a software engineer, I developed this application to enhance my skills in web development, particularly in creating dynamic and interactive web pages using JavaScript, HTML, and CSS.

The application allows users to create tasks with specific descriptions and schedule them to run at specified times. The tasks are stored in an SQLite database and are executed automatically using the `node-schedule` library.

## How to Start

To start the server on your computer, follow these steps:

1. Ensure you have Node.js installed on your machine.
2. Clone the repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Run `npm install` to install the necessary dependencies.
5. Run `node server.js` to start the server.
6. Open your web browser and navigate to `http://http://localhost:3001/cover.html` to see the cover page of the app.

## Purpose

The purpose of my writing this software is to provide a tool that helps users automate their repetitive tasks, thereby saving time and increasing productivity. This project also serves as a learning experience to help improve my web development skills and understanding of server-side programming. It has also been helpful in allowing me practice in web page design and graphic design principles.

## Software Demo Video

[Software Demo Video](https://www.loom.com/share/88a9954c5ce44e0b9656fc463b8691e1?sid=02be9705-88b9-46b8-ad2f-a3b041a8dd3f)

## Web Pages

1. **Cover Page**: This is the landing page of the application. It provides an overview of the tool and includes a button to navigate to the main tool page.
2. **Main Tool Page**: This page allows users to add new tasks, view scheduled tasks, and view completed tasks. The tasks are dynamically loaded from the server and displayed on this page.

### How the Tool Automates Repetitive Tasks

The Task Automation Tool helps automate repetitive tasks by allowing users to schedule tasks to run at specific times. Here’s how it works:

1. **Task Creation**: Users can create tasks by filling out a form with the task name, description, and scheduled time.
2. **Task Storage**: The tasks are stored in an SQLite database.
3. **Task Scheduling**: The `node-schedule` library is used to schedule the tasks to run at the specified times.
4. **Task Execution**: When the scheduled time arrives, the tasks are executed automatically, and a message is logged to the console.

This automation reduces the need for manual intervention, allowing users to focus on more important tasks while the repetitive ones are handled by the tool.

By following these steps and using the provided code, you can ensure that your Task Automation Tool meets the requirements of the rubric and effectively automates repetitive tasks.

## Development Environment

- **Tools**: Visual Studio Code, Node.js, npm
- **Programming Languages**: JavaScript, HTML, CSS
- **Libraries**: Express.js, node-schedule, SQLite

## Useful Websites

- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/docs/)
- [SQLite](https://www.sqlite.org/docs.html)
- [node-schedule](https://www.npmjs.com/package/node-schedule)

## Future Work

- Improve the UI for better user experience.
- Implement additional recurrence options for tasks. (ei. bi-weekly, semi-annually etc.)
- Enhance error handling and validation for user inputs.
