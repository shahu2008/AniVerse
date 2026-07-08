from sqlalchemy import Integer, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class DatasetRating(Base):
    __tablename__ = "dataset_ratings"

    dataset_rating_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    dataset_user_id: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        index=True
    )

    anime_id: Mapped[int] = mapped_column(
        ForeignKey("anime.anime_id"),
        nullable=False
    )

    rating: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    anime = relationship(
        "Anime",
        back_populates="dataset_ratings"
    )