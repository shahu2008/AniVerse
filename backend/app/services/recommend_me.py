from sqlalchemy.orm import Session

from app.models.favorite import Favorite
from app.models.anime import Anime

from app.services.content_based import get_similar_anime
from app.services.popularity import get_top_rated_anime


def recommend_for_current_user(
    db: Session,
    user_id: int,
    limit: int = 20
):

    favorites = (
        db.query(Favorite)
        .filter(Favorite.user_id == user_id)
        .all()
    )

    if not favorites:

        return [
            {
                "anime": anime,
                "reason": "🔥 Popular among all users"
            }
            for anime in get_top_rated_anime(db, limit)
        ]

    recommendations = {}

    favorite_ids = {
        favorite.anime_id
        for favorite in favorites
    }

    for favorite in favorites:

        source = (
            db.query(Anime)
            .filter(
                Anime.anime_id == favorite.anime_id
            )
            .first()
        )

        if source is None:
            continue

        similar = get_similar_anime(
            db,
            source.title,
            limit
        )

        for candidate, similarity in similar:

            if candidate.anime_id in favorite_ids:
                continue

            if candidate.anime_id not in recommendations:

                recommendations[candidate.anime_id] = {

                    "anime": candidate,

                    "score": similarity,

                    "reason": f"❤️ Similar to {source.title}"

                }

            else:

                recommendations[candidate.anime_id]["score"] += similarity

                recommendations[candidate.anime_id]["reason"] = (
                    "🔥 Matches multiple favorites"
                )

    recommendations = sorted(
        recommendations.values(),
        key=lambda x: (
            x["score"],
            x["anime"].rating
        ),
        reverse=True
    )

    return recommendations[:limit]