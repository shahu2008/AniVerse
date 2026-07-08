from sqlalchemy.orm import Session

from app.models.favorite import Favorite
from app.models.anime import Anime

def add_favorite(
    db: Session,
    user_id: int,
    anime_id: int
):

    existing = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == user_id,
            Favorite.anime_id == anime_id
        )
        .first()
    )

    if existing:
        return existing

    favorite = Favorite(
        user_id=user_id,
        anime_id=anime_id
    )

    db.add(favorite)
    db.commit()
    db.refresh(favorite)

    return favorite


def get_favorites(
    db: Session,
    user_id: int
):

    favorites = (
        db.query(Favorite, Anime)
        .join(
            Anime,
            Favorite.anime_id == Anime.anime_id
        )
        .filter(
            Favorite.user_id == user_id
        )
        .all()
    )

    result = []

    for favorite, anime in favorites:

        result.append({

            "favorite_id": favorite.favorite_id,

            "anime_id": anime.anime_id,

            "title": anime.title,

            "poster": anime.poster_url,

            "rating": anime.rating,

            "episodes": anime.episodes,

            "type": anime.type,

            "members": anime.members

        })

    return result
def remove_favorite(
    db: Session,
    user_id: int,
    anime_id: int
):

    favorite = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == user_id,
            Favorite.anime_id == anime_id
        )
        .first()
    )

    if favorite:
        db.delete(favorite)
        db.commit()

    return favorite
