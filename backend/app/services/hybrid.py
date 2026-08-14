from sqlalchemy.orm import Session

from app.services.popularity import get_top_rated_anime
from app.services.content_based import get_similar_anime


def hybrid_recommendation(
    db: Session,
    anime_title: str,
    user_id: int,
    limit: int = 10
):
    recommendations = {}

    # 1. Popular Anime
    popular_anime = get_top_rated_anime(
        db,
        limit
    )

    for anime in popular_anime:
        recommendations[anime.anime_id] = anime

    # 2. Content-Based Similar Anime
    similar_anime = get_similar_anime(
        db,
        anime_title,
        limit
    )

    for item in similar_anime:
        anime = item["anime"]

        recommendations[anime["anime_id"]] = anime

    return list(recommendations.values())[:limit]