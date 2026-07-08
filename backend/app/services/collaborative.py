from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.dataset_rating import DatasetRating
from app.models.anime import Anime


def recommend_by_user(
    db: Session,
    user_id: int,
    limit: int = 10
):
    """
    Recommend anime based on users with similar interests.
    """

    # Anime watched/rated by the user
    watched = (
        db.query(DatasetRating.anime_id)
        .filter(
            DatasetRating.dataset_user_id == user_id
        )
        .all()
    )

    watched = {row[0] for row in watched}

    if not watched:
        return []

    # Find similar users
    similar_users = (
        db.query(DatasetRating.dataset_user_id)
        .filter(
            DatasetRating.anime_id.in_(watched)
        )
        .distinct()
        .all()
    )

    similar_users = [row[0] for row in similar_users]

    # Anime liked by similar users
    recommendations = (
        db.query(
            DatasetRating.anime_id,
            func.avg(DatasetRating.rating).label("avg_rating")
        )
        .filter(
            DatasetRating.dataset_user_id.in_(similar_users)
        )
        .filter(
            ~DatasetRating.anime_id.in_(watched)
        )
        .group_by(
            DatasetRating.anime_id
        )
        .order_by(
            func.avg(DatasetRating.rating).desc()
        )
        .limit(limit)
        .all()
    )

    result = []

    for anime_id, score in recommendations:

        anime = db.query(Anime).filter(
            Anime.anime_id == anime_id
        ).first()

        if anime:
            result.append(
                (
                    anime,
                    round(score, 2)
                )
            )

    return result