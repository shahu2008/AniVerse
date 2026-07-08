from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.models.anime import Anime


def get_top_rated_anime(
    db: Session,
    limit: int = 10
):
    """
    Returns top rated anime.
    """

    return (
    db.query(Anime)
    .filter(
        Anime.members >= 10000
    )
    .order_by(
        desc(Anime.rating),
        desc(Anime.members)
    )
    .limit(limit)
    .all()
)


def get_most_popular_anime(
    db: Session,
    limit: int = 10
):
    """
    Returns anime with highest members.
    """

    return (
        db.query(Anime)
        .order_by(desc(Anime.members))
        .limit(limit)
        .all()
    )