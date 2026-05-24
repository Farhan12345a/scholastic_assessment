# Reading Assignment Portal

A full-stack web application where teachers assign books to students and track reading progress.

## Live Demo

- **URL:** *(add after deployment)*
- **Teacher:** `teacher@demo.com` / `password123`
- **Student:** `student@demo.com` / `password123`
- Additional students: `bob@demo.com`, `carol@demo.com` / `password123`

---

## Running Locally

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+

### 1. Start the Backend

```bash
cd backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080**.  
H2 console available at **http://localhost:8080/h2-console** (JDBC URL: `jdbc:h2:mem:scholastic`).

Books and demo users are seeded automatically on first startup.

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app starts on **http://localhost:5173**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot 3.2, Spring Security, JPA/Hibernate |
| Auth | JWT (jjwt 0.11.5) + BCrypt |
| Database | H2 in-memory (dev) / PostgreSQL (prod) |
| Frontend | React 18, Vite, React Router v6, Axios |
| Styling | Plain CSS |

---

## Architecture

**Backend** follows a simple 3-layer MVC pattern:

```
Controller → Service → Repository (Spring Data JPA)
```

**Auth flow:**
1. Register or login → receive a JWT
2. JWT stored in `localStorage` on the client
3. Every Axios request attaches `Authorization: Bearer <token>`
4. Spring `JwtFilter` validates the token and sets the security context
5. `@PreAuthorize("hasRole('TEACHER')")` guards teacher-only endpoints

**Database schema:**

```
users        — id, name, email, password (bcrypt), role (TEACHER|STUDENT)
books        — id, title, author, description, cover_url, book_url
assignments  — id, book_id, student_id, teacher_id, due_date,
               status (NOT_STARTED|IN_PROGRESS|COMPLETED), minutes_read, created_at
```

---

## API Endpoints

| Method | Path | Role | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/books` | Both | List all books |
| GET | `/api/users/students` | Teacher | List all students |
| POST | `/api/assignments` | Teacher | Create assignments |
| GET | `/api/assignments/teacher` | Teacher | View own assignments |
| GET | `/api/assignments/student` | Student | View own assignments |
| PATCH | `/api/assignments/{id}` | Student | Update status + minutes read |

---

## Key Assumptions

1. **Books are seeded** — 8 classic novels (Project Gutenberg links), no upload UI needed
2. **Teacher assigns one book to multiple students at once** — creates one row per student
3. **"Open book"** = external link to Project Gutenberg, no PDF hosting
4. **Minutes read is self-reported** — student types a number, no live timer
5. **JWT in localStorage** — simpler than httpOnly cookies; acceptable for this scope
6. **No refresh tokens** — JWT expires in 24h; re-login to refresh
7. **Role is set at registration** — simple dropdown (Student / Teacher)

---

## What I'd Improve with More Time

- Refresh tokens + httpOnly cookies for better security
- Pagination on the teacher assignments table
- Real-time progress bar per student/book
- Email notifications when an assignment is due soon
- Teacher can view a per-student breakdown page
- PostgreSQL for production with proper migrations (Flyway)
- Unit + integration tests (JUnit, MockMvc)
- Docker Compose for one-command local setup

---

## Deploying to Production

**Backend → Render**
1. Create a new Web Service on Render, connect this repo, set root to `backend/`
2. Build command: `mvn clean package -DskipTests`
3. Start command: `java -jar target/scholastic-backend-0.0.1-SNAPSHOT.jar`
4. Add a PostgreSQL add-on and set env vars:
   ```
   SPRING_DATASOURCE_URL=jdbc:postgresql://...
   SPRING_DATASOURCE_USERNAME=...
   SPRING_DATASOURCE_PASSWORD=...
   SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.PostgreSQLDialect
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   ```

**Frontend → Vercel**
1. Import repo on Vercel, set root to `frontend/`
2. Add env var: `VITE_API_URL=https://your-render-backend.onrender.com/api`
3. Update `frontend/src/api/axios.js` baseURL to use `import.meta.env.VITE_API_URL`
