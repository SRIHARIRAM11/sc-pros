# Student-College System (SC-PRO)

A comprehensive web application for managing student and teacher activities, including profile management, marks, leave requests, and course materials.

## Features

### Student Module
- **Profile**: View personal and academic details.
- **Marks**: Check subject-wise marks and assignment scores.
- **Leave**: Apply for leave and track status.
- **Courses**: Access enrolled courses and materials.
- **Events**: View upcoming college events.

### Teacher Module
- **Students**: View list of students in the department.
- **Marks Entry**: Enter and update student marks.
- **Leave Approval**: Approve or reject leave requests.

### Admin Module
- Placeholder for future implementation of user and course management.

## Tech Stack
- **Frontend**: React (Vite)
- **Styling**: Vanilla CSS (Glassmorphism, Responsive Design)
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites
- Node.js installed.

### Installation
1. Navigate to the project directory:
   ```bash
   cd "SC - PRO"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and visit: `http://localhost:5173`

## Login Credentials (Mock Data)

| Role    | Email                | Password |
|---------|----------------------|----------|
| Student | srihariram@sc.edu    | password |
| Student | john@sc.edu          | password |
| Teacher | alice@sc.edu         | password |
| Teacher | bob@sc.edu           | password |
| Admin   | admin@sc.edu         | admin    |

## Project Structure
- `src/components`: Reusable UI components (Sidebar, etc.)
- `src/pages`: Page components for each module.
- `src/services`: Mock data service simulating a database.
- `src/index.css`: Global styles and strict CSS variables.
