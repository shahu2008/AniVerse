from sqlalchemy.orm import Session

from app.models.anime import Anime
from app.services.jikan_service import get_anime_details


def get_complete_anime(db: Session, anime_id: int):

    anime = (
        db.query(Anime)
        .filter(Anime.anime_id == anime_id)
        .first()
    )

    if anime is None:
        return None

    jikan = get_anime_details(anime.anime_id)

    return {
        "database": anime,
        "jikan": jikan
    }


def enrich_anime_list(anime_list):

    enriched = []

    for anime in anime_list:

        enriched.append({

            "anime_id": anime.anime_id,
            "title": anime.title,
            "type": anime.type,
            "episodes": anime.episodes,
            "rating": anime.rating,
            "members": anime.members,
            "poster": anime.poster_url

        })

    return enriched