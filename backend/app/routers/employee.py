from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeResponse

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/", response_model=EmployeeResponse, status_code=201)
def create_employee(data: EmployeeCreate, db: Session = Depends(get_db)):

    # checking duplicate email or employee_id codes
    existing = db.query(Employee).filter(
        (Employee.email == data.email) |
        (Employee.employee_id == data.employee_id)
    ).first()

    if existing:
        raise HTTPException(
            status_code=409,
            detail="Employee with this email or employee_id already exists"
        )

    employee = Employee(**data.model_dump())

    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee


@router.get("/", response_model=list[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()


@router.delete("/{employee_id}", status_code=204)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):

    employee = db.query(Employee).filter(Employee.id == employee_id).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()
