from sqlalchemy.orm import Session

from app.models.anime import Anime

from app.utils.genre import build_genre_lookup
from app.utils.similarity import jaccard_similarity


def get_similar_anime(
    db: Session,
    anime_title: str,
    limit: int = 10
):

    lookup = build_genre_lookup(db)

    anime = (
        db.query(Anime)
        .filter(
            Anime.title.ilike(anime_title)
        )
        .first()
    )

    if anime is None:
        return []

    source = lookup[anime.anime_id]

    recommendations = []

    all_anime = db.query(Anime).all()

    for candidate in all_anime:

        if candidate.anime_id == anime.anime_id:
            continue

        score = jaccard_similarity(
            source,
            lookup[candidate.anime_id]
        )

        if score > 0:

            recommendations.append(
                (
                    candidate,
                    score
                )
            )

    recommendations.sort(
        key=lambda x: (
            x[1],
            x[0].rating
        ),
        reverse=True
    )

    result = []

    for anime, score in recommendations[:limit]:

        result.append({

            "anime": {

                "anime_id": anime.anime_id,

                "title": anime.title,

                "episodes": anime.episodes,

                "members": anime.members,

                "poster": anime.poster_url,

                "type": anime.type,

                "rating": anime.rating

            },

            "similarity": round(score, 2)

        })

    return result