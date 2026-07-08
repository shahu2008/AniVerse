from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Genre(Base):
    __tablename__ = "genre"

    # Primary Key
    genre_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    # Genre Name
    genre_name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False
    )

    # Relationship (will connect to AnimeGenre later)
    anime_genres = relationship(
        "AnimeGenre",
        back_populates="genre"
    )