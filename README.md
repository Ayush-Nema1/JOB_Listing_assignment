# Workboard — Job Listings

A practical paginated job-listing feature built for the full-stack assessment.

## Stack

- **Backend:** FastAPI + Python
- **Frontend:** Next.js App Router + TypeScript + Tailwind CSS
- **Data:** 30 in-memory job listings, no database

## Run the backend

Open a terminal in the project folder and run:

```bash
cd backend
py -m pip install -r requirements.txt
py -m uvicorn main:app --reload --port 8000vicorn main:app --reload --port 8000
```

API docs:

```text
http://localhost:8000/docs
```

Example API request:

```text
http://localhost:8000/api/jobs?page=1&limit=6
```

Search example:

```text
http://localhost:8000/api/jobs?page=1&limit=6&search=frontend
```

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Features

- Paginated job listings
- Backend-side search by role, company, location, experience, or employment type
- Total matching result count
- First/last page protection
- Loading skeleton
- Error state with retry
- CORS for frontend/backend on different ports
- Responsive UI
- No database

## Assessment architecture question

See `ARCHITECTURE_ANSWERS.md` for the three architecture scenario answers.

## Note on dataset

The job records are a hardcoded demo dataset created for the assessment. They are not intended to represent live vacancies or guaranteed openings.
