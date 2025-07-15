✅ MERN Stack Task Management App with Firebase Authentication
I have developed a Task Management Application using the MERN Stack (MongoDB, Express.js, React, Node.js) that allows users to organize tasks visually across multiple stages of progress. The interface and workflow are inspired by Kanban-style productivity tools like Trello or Jira.

🔧 Key Features
🧑‍💼 Authentication (Firebase Magic Link)
Firebase Authentication is integrated to provide passwordless login via Magic Links.

When a user enters their email, a secure link is sent to their inbox, enabling a seamless and secure sign-in experience.

Eliminates the need for users to remember passwords, improving UX and security.

📋 Task Cards with Rich Content
Users can create task cards with:

Title

Description

Cards are stored in the backend (MongoDB), preserving state across sessions.

📦 Dynamic Columns
Three main columns are dynamically rendered:

To Do

On Progress

Done

Each column represents a stage of the task lifecycle.

🖱️ Drag-and-Drop Interaction (Powered by @dnd-kit)
Implemented drag-and-drop functionality to allow users to move tasks between columns.

Real-time visual feedback during dragging.

Cards retain their original styling and dimensions while being moved.

Prevents duplication and handles drop logic gracefully.

➕ Add Task Functionality
Tasks are added through an input form.

New tasks are automatically added to the first column (“To Do”) for logical workflow initiation.

🧠 State Management
React useState and contextual state are used to manage cards and columns dynamically.

Drag logic updates the global task structure without reloading.

🎨 Responsive UI with Thematic Colors
Clean UI with clear visual distinction between task stages:

Purple for “To Do”

Orange for “On Progress”

Green for “Done”

Uses SCSS for modular styling.

Cards are scrollable with smooth overflow handling.

📦 Tech Stack Overview
Layer	Technology
Frontend	React.js, SCSS, @dnd-kit
Backend	Node.js, Express.js
Database	MongoDB (Mongoose)
Auth	Firebase (Magic Link)
State Mgmt	React Hooks

🔐 Security & Best Practices
Authentication tokens are securely managed via Firebase.

Frontend and backend are separated with clean API endpoints.

Reusable components for Draggable and Droppable zones.

🧩 Possible Extensions
Real-time collaboration with WebSockets

User roles and permission-based boards

Due dates and notifications
