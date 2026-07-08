from sqlalchemy import Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class AnimeGenre(Base):
    __tablename__ = "anime_genre"

    anime_id: Mapped[int] = mapped_column(
        ForeignKey("anime.anime_id"),
        primary_key=True
    )

    genre_id: Mapped[int] = mapped_column(
        ForeignKey("genre.genre_id"),
        primary_key=True
    )

    anime = relationship(
        "Anime",
        back_populates="anime_genres"
    )

    genre = relationship(
        "Genre",
        back_populates="anime_genres"
    )