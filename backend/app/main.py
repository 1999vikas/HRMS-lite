from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import engine, Base
from app.models import employee, attendance
from app.routers import employee as employee_router
from app.routers import attendance as attendance_router

app = FastAPI(title="HRMS Lite API")


Base.metadata.create_all(bind=engine)

#  CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# all  routers
app.include_router(employee_router.router)
app.include_router(attendance_router.router)


@app.get("/")
def root():
    return {"message": "HRMS Backend Testing"}




# showing global error 
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error"}
    )
