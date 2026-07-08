from datetime import datetime

from sqlalchemy import Integer, String, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Watchlist(Base):
    __tablename__ = "watchlists"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "anime_id",
            name="uq_user_watchlist"
        ),
    )

    watchlist_id: Mapped[int] = mapped_column(
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

    status: Mapped[str] = mapped_column(
        String(30),
        default="Plan to Watch",
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    user = relationship(
        "User",
        back_populates="watchlists"
    )

    anime = relationship(
        "Anime",
        back_populates="watchlists"
    )