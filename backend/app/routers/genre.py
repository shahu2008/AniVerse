from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.models.genre import Genre
from app.models.anime import Anime
from app.models.anime_genre import AnimeGenre

router = APIRouter(
    prefix="/genres",
    tags=["Genres"]
)


@router.get("/")
def get_all_genres(db: Session = Depends(get_db)):
    return db.query(Genre).all()


@router.get("/{genre_name}/anime")
def get_anime_by_genre(
    genre_name: str,
    db: Session = Depends(get_db)
):
    anime = (
        db.query(Anime)
        .join(AnimeGenre)
        .join(Genre)
        .filter(Genre.genre_name == genre_name)
        .limit(8)
        .all()
    )

    return anime