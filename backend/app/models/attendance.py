import enum
from datetime import date   

from sqlalchemy import ForeignKey, Enum, UniqueConstraint, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base


class AttendanceStatus(str, enum.Enum):
    present = "present"
    absent = "absent"


class Attendance(Base):
    __tablename__ = "attendance"

    id: Mapped[int] = mapped_column(primary_key=True)

    employee_id: Mapped[int] = mapped_column(
        ForeignKey("employees.id", ondelete="CASCADE"),
        nullable=False
    )

    
    date: Mapped[date] = mapped_column(Date, nullable=False)

    status: Mapped[AttendanceStatus] = mapped_column(
        Enum(AttendanceStatus),
        nullable=False
    )

    employee = relationship("Employee", back_populates="attendance_records")

    __table_args__ = (
        UniqueConstraint("employee_id", "date", name="unique_attendance"),
    )
