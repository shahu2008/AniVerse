from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.anime import Anime
from app.schemas.anime import AnimeCreate, AnimeUpdate


# Create
def create_anime(db: Session, anime: AnimeCreate) -> Anime:
    db_anime = Anime(
        title=anime.title,
        type=anime.type,
        episodes=anime.episodes,
        rating=anime.rating,
        members=anime.members,
    )

    db.add(db_anime)
    db.commit()
    db.refresh(db_anime)

    return db_anime


# Read by ID
def get_anime_by_id(db: Session, anime_id: int):
    return db.execute(
        select(Anime).where(Anime.anime_id == anime_id)
    ).scalar_one_or_none()


# Read All
def get_all_anime(db: Session):
    return db.execute(
        select(Anime)
    ).scalars().all()


# Update
def update_anime(
    db: Session,
    anime_id: int,
    anime_update: AnimeUpdate
):
    anime = get_anime_by_id(db, anime_id)

    if anime is None:
        return None

    update_data = anime_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(anime, key, value)

    db.commit()
    db.refresh(anime)

    return anime


# Delete
def delete_anime(db: Session, anime_id: int):
    anime = get_anime_by_id(db, anime_id)

    if anime is None:
        return False

    db.delete(anime)
    db.commit()

    return True