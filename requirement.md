# Project Requirements: Full-Stack ISBN Book Search Application

## 1. High-Level Goal

Build a functional, full-stack web application where a user can enter a book's ISBN (International Standard Book Number) and retrieve its details. The application must be deployed live and the source code must be made available in a public GitHub repository.

---

## 2. Core Functionality

- **User Input:** The user must be able to input an ISBN number into a text field on the web page.
- **Data Retrieval:** Upon submitting the ISBN, the application's frontend will query its backend API.
- **Backend Logic:** The backend API will receive the ISBN, fetch the corresponding book data from a public API (like Open Library) or via web scraping, and return the formatted data.
- **Display Results:** The frontend will display the retrieved book information (Title, Author(s), Publisher(s), Publication Date) to the user.
- **User Feedback:** The UI should indicate loading states (while fetching data) and handle/display errors gracefully (e.g., if the ISBN is not found or an API error occurs).

---

## 3. Technology Stack

### 3.1. Frontend

- **Framework:** React or Next.js (Next.js is preferred).
- **Language:** JavaScript (or TypeScript, which is a "nice-to-have").
- **UI:** Must be responsive and function well on both desktop and mobile viewports.
- **State Management:** Use React Hooks (`useState`, `useEffect`). Redux or Context API are acceptable.
- **API Communication:** Consume the backend's REST API using `fetch` or a library like `axios`.

### 3.2. Backend

- **Framework:** Django with Django REST Framework (DRF).
- **Language:** Python.
- **Database:** PostgreSQL (for data modeling, migrations, and performance tuning, although for this simple app, direct database interaction may be minimal).
- **API Design:** Create a RESTful API endpoint that accepts an ISBN as a parameter.
  - Example Endpoint: `GET /api/book/{isbn}/`
- **Data Source:** Use a public book API (e.g., [https://openlibrary.org/developers/api](https://openlibrary.org/developers/api)) or a web scraping method to get book data. No API key should be required for the basic implementation.
- **Asynchronous Tasks (Optional but good to demonstrate):** If complex processing were needed, Celery with Redis/RabbitMQ would be used. For this project, a direct API call is sufficient.

---

## 4. Key Deliverables

### 4.1. Application

- A fully implemented frontend application.
- A fully implemented backend API.
- The application must be live and publicly accessible.

### 4.2. Code Repository

- A public GitHub (or GitLab) repository containing the complete source code for both the frontend and backend.
- The repository must have clean, modular, and well-commented code.
- Include a `.gitignore` file to exclude unnecessary files and folders (e.g., `node_modules`, `venv`, `__pycache__`).

### 4.3. Documentation

- A comprehensive `README.md` file in the root of the repository.
- The `README.md` must include:
  - Project Title.
  - A link to the live demo.
  - A description of the project and its functionality.
  - The technology stack used.
  - Clear instructions on how to set up and run the project locally.
  - A "Tooling Transparency" section detailing the use of any AI-powered development tools (e.g., GitHub Copilot, ChatGPT) and for what purpose.

---

## 5. Deployment

- **Containerization:** The application (both frontend and backend) must be containerized using Docker.
- **Dockerfiles:** Provide separate `Dockerfile`s for the frontend and backend services.
- **Orchestration:** Use `docker-compose.yml` for easy local development setup (optional but recommended).
- **Hosting:** Deploy the application to a free hosting provider. The official recommendation is **fly.io**.
- **Deployment Server Location:** The fly.io application must be deployed to the **Amsterdam (ams)** server region.

---

## 6. Security & Best Practices

- **API Security:** The Django backend should be configured with `django-cors-headers` to allow requests only from the deployed frontend's domain.
- **Code Quality:** Adhere to standard coding conventions for Python (PEP 8) and JavaScript/React.
- **Version Control:** Use Git for version control with meaningful commit messages.
