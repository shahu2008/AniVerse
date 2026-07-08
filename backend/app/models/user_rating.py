from datetime import datetime

from sqlalchemy import Integer, Float, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class UserRating(Base):
    __tablename__ = "user_ratings"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "anime_id",
            name="uq_user_anime_rating"
        ),
    )

    user_rating_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id"),
        nullable=False
    )

    anime_id: Mapped[int] = mapped_column(
        ForeignKey("anime.anime_id"),
        nullable=False
    )

    rating: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    rated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    user = relationship(
        "User",
        back_populates="user_ratings"
    )

    anime = relationship(
        "Anime",
        back_populates="user_ratings"
    )