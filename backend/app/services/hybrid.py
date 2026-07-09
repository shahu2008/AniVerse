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

    # Popular Anime
    for anime in get_top_rated_anime(db, limit):
        recommendations[anime.anime_id] = anime

   # Content-Based Similar Anime
for anime, _ in get_similar_anime(
    db,
    anime_title,
    limit
):
    recommendations[anime.anime_id] = anime