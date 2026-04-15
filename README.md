# Task Management System (Full-Stack)

A complete, production-ready Full-Stack project featuring a robust Task Management System with Authentication and Role-Based Access Control (RBAC).

## 🚀 Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT) + bcryptjs for Authentication
- express-validator for robust request validation
- Helmet (Security Headers) & CORS
- Morgan (Logging)

**Frontend:**
- React.js (Vite)
- React Router DOM
- Axios (With Interceptors)
- lucide-react (Icons)
- Custom CSS with Tailwind-like utility classes and color variables

## 📁 Folder Structure

```
backend-Intern/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication, Error handling, Validation
│   ├── models/          # Mongoose Schemas (User, Task)
│   ├── routes/          # Express Routers
│   ├── utils/           # Utilities (Logger)
│   ├── .env             # Environment variables
│   ├── app.js           # Express App configuration
│   └── server.js        # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components (Navbar, TaskCard, TaskForm)
│   │   ├── pages/       # Next.js-like Pages (Login, Register, Dashboard)
│   │   ├── services/    # Axios API configuration
│   │   ├── App.jsx      # Routes & Layout logic
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Global styling
│   ├── index.html
│   └── package.json
├── TaskManagement.postman_collection.json  # Exported Postman collection
└── README.md
```

## 🛠️ Setup Instructions

### 1. Backend Setup

1. Make sure you have MongoDB running locally (default url: `mongodb://127.0.0.1:27017/task_mgmt`). If using MongoDB Atlas, modify the `.env` file.
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend development server:
   ```bash
   node server.js
   ```
   *The server will start on `http://localhost:5000`*

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will open correctly on `http://localhost:5173`.*

## 🔌 API Endpoints (v1)

### Auth Routes (`/api/v1/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login to an existing account
- `GET /me` - Get the current authenticated user

### Task Routes (`/api/v1/tasks`)
*(All Task routes are protected and require a Bearer token)*
- `GET /` - Fetch tasks (Supports Pagination `?page=1&limit=10` and Search `?search=keyword`)
- `GET /:id` - Get a single task by ID
- `POST /` - Create a new task
- `PUT /:id` - Update an existing task
- `DELETE /:id` - Delete an existing task

## 📈 Scalability Explanation

This project was built with scaling in mind using clean separation of concerns and modular abstractions:

1. **Microservices Readiness:** 
   The application currently exists as a monolithic structure for easy deployment, but the boundaries (Controllers, Route files, independent logic for Tasks vs Auth) act as domain models. If scaling horizontally across many servers, you could split Auth and Tasks into independent services interacting over event buses like Kafka or RabbitMQ.
2. **Caching Strategy (Redis):** 
   Currently it hits the database. A common optimization would be caching JWT token invalidations and repetitive read queries (like `GET /tasks`) heavily in Redis. The application is isolated behind an Express `.use()` layer that can cleanly integrate a Redis middleware with minimal refactoring.
3. **Load Balancing:** 
   The Express Application is stateless! Session state is maintained via JWT sent from the client instead of stored in-memory, ensuring that a load balancer like NGINX or HAProxy can effortlessly distribute incoming traffic across multiple running Node instances without sticky sessions.
4. **Database Horizontal Scaling:** 
   Mongoose configurations can easily be connected to a MongoDB replica set or sharded cluster to partition terabytes of Task data based on keys like `userId`.

## 📦 Documentation

A `TaskManagement.postman_collection.json` has been included in the root. Import it into Postman to automatically test out all backend endpoints.
