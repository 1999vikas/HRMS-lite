# HRMS Lite

---

## Features

* Employee CRUD operations
* Role-based authentication
* MySQL database integration
* Responsive dashboard
* Ready for cloud deployment

---

## Tech Stack

* **Backend:** Python, FastAPI, SQLAlchemy, PyMySQL
* **Frontend:** React.js
* **Database:** MySQL
* **Deployment:** Render (backend), Vercel  (frontend)

---


## Folder Structure

```
.
├── backend/
│   ├── app/
│   │   └── main.py
│   ├── requirements.txt
│   └── ... (other backend files)
├── frontend/
│   └── ... (React/Next.js app)
└── .gitignore
```

---

## Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux / macOS
venv\Scripts\activate     # Windows

pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

---

---

