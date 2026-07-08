from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.watchlist import Watchlist
from app.models.anime import Anime


# ==========================
# Add to Watchlist
# ==========================
def add_watchlist(
    db: Session,
    user_id: int,
    anime_id: int
):

    existing = (
        db.query(Watchlist)
        .filter(
            Watchlist.user_id == user_id,
            Watchlist.anime_id == anime_id
        )
        .first()
    )

    if existing:
        return existing

    watchlist = Watchlist(
        user_id=user_id,
        anime_id=anime_id
    )

    db.add(watchlist)
    db.commit()
    db.refresh(watchlist)

    return watchlist


# ==========================
# Get User Watchlist
# ==========================
def get_watchlist(
    db: Session,
    user_id: int
):

    watchlist = (
        db.query(Watchlist, Anime)
        .join(
            Anime,
            Watchlist.anime_id == Anime.anime_id
        )
        .filter(
            Watchlist.user_id == user_id
        )
        .all()
    )

    result = []

    for watch, anime in watchlist:

        result.append({

            "watchlist_id": watch.watchlist_id,

            "anime_id": anime.anime_id,

            "title": anime.title,

            "poster": anime.poster_url,

            "rating": anime.rating,

            "episodes": anime.episodes,

            "type": anime.type,

            "members": anime.members

        })

    return result


# ==========================
# Remove from Watchlist
# ==========================
def remove_watchlist(
    db: Session,
    user_id: int,
    anime_id: int
):

    watch = (
        db.query(Watchlist)
        .filter(
            Watchlist.user_id == user_id,
            Watchlist.anime_id == anime_id
        )
        .first()
    )

    if watch is None:
        raise HTTPException(
            status_code=404,
            detail="Watchlist item not found."
        )

    db.delete(watch)
    db.commit()

    return {
        "message": "Removed from watchlist."
    }