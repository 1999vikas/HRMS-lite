from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from app.db.session import Base


class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[int] = mapped_column(primary_key=True)

    employee_id: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )

    full_name: Mapped[str] = mapped_column(String(120), nullable=False)

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    department: Mapped[str] = mapped_column(String(120), nullable=False)

    attendance_records = relationship(
        "Attendance",
        back_populates="employee",
        cascade="all, delete"
    )
