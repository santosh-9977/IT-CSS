# React Task Manager 📝

A modern, responsive task management application built with React, featuring CRUD operations, React Router for navigation, Context API for state management, and beautiful CSS styling.

## ✨ Features

- **Complete CRUD Operations**: Create, Read, Update, and Delete tasks
- **Task Status Management**: Mark tasks as pending or completed
- **Priority Levels**: Set task priorities (Low, Medium, High) with color coding
- **Search & Filter**: Search tasks by title/description and filter by status
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: Persist tasks between browser sessions
- **Modern UI**: Beautiful glassmorphism design with smooth animations
- **React Router**: Client-side routing for seamless navigation
- **Context API**: Centralized state management

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd react-task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🏗️ Project Structure

```
react-task-manager/
├── public/
├── src/
│   ├── components/
│   │   ├── TaskList.jsx      # Main task list view
│   │   ├── TaskItem.jsx      # Individual task card
│   │   ├── TaskForm.jsx      # Add/Edit task form
│   │   └── TaskDetail.jsx    # Task detail view
│   ├── context/
│   │   └── TaskContext.jsx   # Context API for state management
│   ├── styles/
│   │   ├── App.css           # Global styles and navigation
│   │   ├── TaskList.css      # Task list styling
│   │   ├── TaskItem.css      # Task card styling
│   │   ├── TaskForm.css      # Form styling
│   │   └── TaskDetail.css    # Task detail styling
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── package.json
├── vite.config.js
└── index.html
```

## 🎯 Usage

### Adding a Task
1. Click "Add Task" in the navigation or the "Add New Task" button
2. Fill in the task title, description, and select priority
3. Click "Create Task" to save

### Viewing Tasks
- All tasks are displayed on the main page in a responsive grid
- Use the search bar to find specific tasks
- Filter tasks by status (All, Pending, Completed)
- Click on any task title to view full details

### Editing a Task
1. Click the "Edit" button on any task card
2. Modify the task details in the form
3. Click "Update Task" to save changes

### Managing Task Status
- Click the circle icon (○) to mark a task as completed (✓)
- Click the checkmark (✓) to mark a task as pending (○)
- Status can be toggled from both the task list and detail views

### Deleting a Task
1. Click the "Delete" button on any task card or in the detail view
2. Confirm the deletion in the popup dialog

## 🎨 Design Features

- **Glassmorphism UI**: Modern frosted glass effect with backdrop blur
- **Gradient Backgrounds**: Beautiful color gradients throughout the interface
- **Priority Color Coding**: Visual indicators for task priorities
  - 🔴 High Priority (Red)
  - 🟡 Medium Priority (Yellow)
  - 🟢 Low Priority (Green)
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Layout**: Adapts to all screen sizes with mobile-first approach

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing and navigation
- **Context API**: State management and data sharing
- **Vite**: Fast build tool and development server
- **CSS3**: Advanced styling with flexbox, grid, and animations
- **Local Storage**: Browser storage for data persistence

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Key Components

### TaskContext
Provides centralized state management with:
- Task CRUD operations
- Search and filter functionality
- Local storage integration
- Task statistics

### TaskList
Main dashboard displaying:
- Task statistics (Total, Pending, Completed)
- Search and filter controls
- Responsive task grid
- Empty state handling

### TaskForm
Dynamic form component for:
- Adding new tasks
- Editing existing tasks
- Form validation
- Loading states

### TaskDetail
Comprehensive task view with:
- Full task information
- Status and priority management
- Action buttons
- Timestamps

## 🎪 Demo Features

The application includes several sample interactions:
1. Create your first task to see the interface in action
2. Try different priority levels to see color coding
3. Use search and filters to organize tasks
4. Toggle task status to see animations
5. View task details for comprehensive information

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Task Managing! 🎯**