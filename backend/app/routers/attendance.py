from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.attendance import Attendance
from app.models.employee import Employee
from app.schemas.attendance import AttendanceCreate, AttendanceResponse,AttendanceOut
from sqlalchemy.orm import joinedload
from datetime import date


router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/", response_model=AttendanceResponse, status_code=201)
def mark_attendance(data: AttendanceCreate, db: Session = Depends(get_db)):

    employee = db.query(Employee).filter(Employee.id == data.employee_id).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    duplicate = db.query(Attendance).filter(
        Attendance.employee_id == data.employee_id,
        Attendance.date == data.date
    ).first()

    if duplicate:
        raise HTTPException(
            status_code=409,
            detail="Attendance already marked for this date"
        )

    attendance = Attendance(**data.model_dump())

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return attendance


@router.get("/all", response_model=list[AttendanceOut])
def list_attendance(
    date: Optional[date] = Query(None),
    db: Session = Depends(get_db)
):

    query = db.query(Attendance).options(
        joinedload(Attendance.employee)
    )

    if date:
        query = query.filter(Attendance.date == date)

    attendance = query.order_by(
        Attendance.date.desc()
    ).all()

    return attendance


@router.get("/{employee_id}", response_model=list[AttendanceResponse])
def get_attendance(employee_id: int, db: Session = Depends(get_db)):
    return db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).all()
