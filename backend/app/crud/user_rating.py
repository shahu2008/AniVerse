from sqlalchemy.orm import Session

from app.models.user_rating import UserRating


def add_rating(
    db: Session,
    user_id: int,
    anime_id: int,
    rating: float
):

    existing = (
        db.query(UserRating)
        .filter(
            UserRating.user_id == user_id,
            UserRating.anime_id == anime_id
        )
        .first()
    )

    if existing:
        existing.rating = rating
        db.commit()
        db.refresh(existing)
        return existing

    new_rating = UserRating(
        user_id=user_id,
        anime_id=anime_id,
        rating=rating
    )

    db.add(new_rating)
    db.commit()
    db.refresh(new_rating)

    return new_rating


def get_my_ratings(
    db: Session,
    user_id: int
):

    return (
        db.query(UserRating)
        .filter(UserRating.user_id == user_id)
        .all()
    )


from fastapi import HTTPException

def delete_rating(
    db: Session,
    rating_id: int,
    user_id: int
):

    rating = (
        db.query(UserRating)
        .filter(
            UserRating.user_rating_id == rating_id,
            UserRating.user_id == user_id
        )
        .first()
    )

    if rating is None:
        raise HTTPException(
            status_code=404,
            detail="Rating not found."
        )

    db.delete(rating)
    db.commit()

    return {
        "message": "Rating deleted."
    }
def get_user_rating(
    db: Session,
    user_id: int,
    anime_id: int
):

    return (
        db.query(UserRating)
        .filter(
            UserRating.user_id == user_id,
            UserRating.anime_id == anime_id
        )
        .first()
    )
