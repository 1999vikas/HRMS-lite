from pydantic import BaseModel
from datetime import date
from app.models.attendance import AttendanceStatus
from app.schemas.employee import EmployeeOut


class AttendanceCreate(BaseModel):
    employee_id: int
    date: date
    status: AttendanceStatus


class AttendanceOut(BaseModel):
    id: int
    employee_id: int
    date: date
    status: str

    employee: EmployeeOut  

    class Config:
        from_attributes = True

class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    date: date
    status: AttendanceStatus

    class Config:
        from_attributes = True
