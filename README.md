# Bloggy

Bloggy is a modern, full-stack blog application built with React, Node.js, and PostgreSQL. It features a beautiful UI, secure authentication, and rich content management capabilities.



https://github.com/user-attachments/assets/ccf4af77-8842-421c-afef-a1af40a572b5



## 🚀 Features

- **User Authentication**: Secure sign-up and sign-in using [Clerk](https://clerk.com/).
- **Create & Manage Posts**: Users can create, edit, and delete their own blog posts.
- **Rich Text Support**: Write engaging stories with titles and content.
- **Image Upload**: Seamless image uploading via [Cloudinary](https://cloudinary.com/).
- **Categories**: Organize posts by topics (Technology, Lifestyle, Programming, etc.).
- **Responsive Design**: A fully responsive interface built with Tailwind CSS and DaisyUI.
- **Reading Time**: Automatic calculation of reading time for articles.
- **User Profiles**: Author attribution and profile management.

## 🛠️ Tech Stack

### Frontend

- **React**: UI Library
- **Vite**: Build tool
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library for Tailwind
- **Clerk**: Authentication and User Management
- **React Router**: Navigation

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **PostgreSQL**: Relational database
- **node-postgres (pg)**: PostgreSQL client for Node.js

## 📦 Installation & Setup

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL installed and running
- A Clerk account (for authentication)
- A Cloudinary account (for image uploads)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bloggy
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variable:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/bloggy_db
PORT=5000
```

_Replace `username`, `password`, and `bloggy_db` with your PostgreSQL credentials._

Initialize the database schema:
You can run the SQL commands found in `backend/src/models/schema.sql` in your PostgreSQL database tool (like pgAdmin or psql) to create the necessary tables.

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory with the following variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

Start the frontend development server:

```bash
npm run dev
```

## 🏃‍♂️ Running the App

Once both servers are running:

- Backend will be available at `http://localhost:5000`
- Frontend will be available at `http://localhost:5173` (or the port shown in your terminal)

Open your browser and visit the frontend URL to start using Bloggy!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
