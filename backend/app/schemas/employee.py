from pydantic import BaseModel, EmailStr


class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeOut(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: str
    department: str

    class Config:
        from_attributes = True

class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

    class Config:
        from_attributes = True
