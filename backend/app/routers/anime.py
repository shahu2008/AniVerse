from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.anime import Anime
from app.services.anime_service import (
    get_complete_anime,
    enrich_anime_list,
)
from app.services.jikan_service import get_anime_details

router = APIRouter(
    prefix="/anime",
    tags=["Anime"]
)


# ==========================
# Get All Anime
# ==========================
@router.get("/")
def get_all_anime(
    limit: int = 100,
    offset: int = 0,
    db: Session = Depends(get_db)
):

    anime = (
        db.query(Anime)
        .filter(Anime.poster_url != None)
        .order_by(Anime.members.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    return enrich_anime_list(anime)


# ==========================
# Get Top Rated Anime
# ==========================
@router.get("/top")
def get_top_anime(
    limit: int = 24,
    db: Session = Depends(get_db)
):

    anime = (
    db.query(Anime)
    .filter(
    Anime.poster_url != None,
    Anime.members >= 50000,
    Anime.rating != None
)
    .order_by(Anime.rating.desc())
    .limit(limit)
    .all()
)

    return enrich_anime_list(anime)


# ==========================
# Search Anime
# ==========================
@router.get("/search")
def search_anime(
    query: str = Query(...),
    db: Session = Depends(get_db)
):

    anime = (
        db.query(Anime)
        .filter(
            Anime.title.ilike(f"%{query}%")
        )
        .all()
    )

    return enrich_anime_list(anime)


# ==========================
# Get Anime By ID
# ==========================
@router.get("/featured")
def get_featured_anime(
    db: Session = Depends(get_db)
):
    anime = (
        db.query(Anime)
        .filter(
            Anime.poster_url != None,
            Anime.members >= 500000
        )
        .order_by(Anime.rating.desc())
        .first()
    )

    if not anime:
        return None

    jikan = get_anime_details(anime.anime_id)

    return {
        "anime_id": anime.anime_id,
        "title": anime.title,
        "rating": anime.rating,
        "episodes": anime.episodes,
        "type": anime.type,
        "members": anime.members,
        "poster": anime.poster_url,
        "synopsis": jikan["synopsis"] if jikan else "",
        "year": jikan["year"] if jikan else None
    }
@router.get("/{anime_id}")
def get_anime(
    anime_id: int,
    db: Session = Depends(get_db)
):

    return (
        db.query(Anime)
        .filter(
            Anime.anime_id == anime_id
        )
        .first()
    )


# ==========================
# Complete Anime Details
# ==========================
@router.get("/{anime_id}/details")
def get_anime_details_complete(
    anime_id: int,
    db: Session = Depends(get_db)
):
    return get_complete_anime(db, anime_id)