from collections import defaultdict

from sqlalchemy.orm import Session

from app.models.anime_genre import AnimeGenre


def build_genre_lookup(db: Session):
    """
    Build a dictionary:
    {
        anime_id: {genre_ids}
    }
    """

    lookup = defaultdict(set)

    rows = db.query(AnimeGenre).all()

    for row in rows:
        lookup[row.anime_id].add(row.genre_id)

    return lookup