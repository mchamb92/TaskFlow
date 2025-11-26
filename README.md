Hello, this is Mustafa Chambers, and this is my app called TaskFlow.

A simple full stack Task Manager application built using Spring Boot, PostgreSQL (Docker), and React (Vite).
This project demonstrates clean backend API design, database integration, and a working modern React frontend.

⭐ Overview
TaskManager is a CRUD application where users can:
Create tasks
View all tasks
Update task information
Delete tasks
Automatically persist data in PostgreSQL
The backend exposes REST APIs using Spring Boot, and the frontend communicates with these APIs using Axios.

🛠 Tech Stack
Backend
Java 23
Spring Boot 3
Spring Data JPA
PostgreSQL (Docker)
Hibernate ORM
Frontend
React + Vite
Axios for API calls
Modern functional components (hooks)
Dev Tools
Docker
Maven
Vite Dev Server

🚀 How to Run the Project (Working Steps)

These are the exact steps that worked in your environment.

1️⃣ Start PostgreSQL using Docker
docker run --name taskdb \
  -e POSTGRES_DB=taskdb \
  -e POSTGRES_USER=taskuser \
  -e POSTGRES_PASSWORD=taskpass \
  -p 5434:5432 \
  -d postgres:16

Verify connection:
PGPASSWORD=taskpass psql -h 127.0.0.1 -p 5434 -U taskuser -d taskdb -c "\conninfo"
You should see output confirming the connection.

2️⃣ Start the Spring Boot Backend
In the backend folder:
mvn spring-boot:run
The API will run at:
http://localhost:8080/api/tasks

Test the API:
curl http://localhost:8080/api/tasks

3️⃣ Start the React Frontend
In the frontend folder:
npm install
npm run dev

The UI runs at:
http://localhost:5174/

If you used port 5173 instead, update CORS settings accordingly.

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create a new task
GET	/api/tasks/{id}	Get task by ID
PUT	/api/tasks/{id}	Update task
DELETE	/api/tasks/{id}	Delete task
🧩 Folder Structure
taskmanager/
- backend/ (Spring Boot)
- frontend/ (React + Vite)

✔️ Features Working
Fully functioning CRUD backend
PostgreSQL container with persisted data
React UI connected to backend
CORS configured correctly
Axios API integration
Live reload on both backend & frontend

📌 Next Steps You Can Add Later
Add UI styling
Add task categories
Add login/auth
Deploy backend to Render / Railway
Deploy frontend to Vercel

