from sqlalchemy import Integer, String, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Anime(Base):
    __tablename__ = "anime"

    anime_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    type: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    episodes: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    rating: Mapped[float] = mapped_column(
        Float,
        nullable=True
    )

    members: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    anime_genres = relationship(
        "AnimeGenre",
        back_populates="anime",
        cascade="all, delete-orphan"
    )

    dataset_ratings = relationship(
        "DatasetRating",
        back_populates="anime",
        cascade="all, delete-orphan"
    )

    user_ratings = relationship(
        "UserRating",
        back_populates="anime",
        cascade="all, delete-orphan"
    )

    favorites = relationship(
        "Favorite",
        back_populates="anime",
        cascade="all, delete-orphan"
    )

    watchlists = relationship(
        "Watchlist",
        back_populates="anime",
        cascade="all, delete-orphan"
    )

    reviews = relationship(
        "Review",
        back_populates="anime",
        cascade="all, delete-orphan"
    )
    poster_url: Mapped[str | None] = mapped_column(
    String(500),
    nullable=True
)