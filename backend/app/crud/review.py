from sqlalchemy.orm import Session

from app.models.review import Review
from app.models.user import User


def add_review(
    db: Session,
    user_id: int,
    anime_id: int,
    review_text: str
):

    review = Review(
        user_id=user_id,
        anime_id=anime_id,
        review=review_text
    )

    db.add(review)
    db.commit()
    db.refresh(review)

    return review


def get_my_reviews(
    db: Session,
    user_id: int
):

    return (
        db.query(Review)
        .filter(
            Review.user_id == user_id
        )
        .all()
    )


def get_anime_reviews(
    db: Session,
    anime_id: int
):

    reviews = (
        db.query(Review, User)
        .join(
            User,
            Review.user_id == User.user_id
        )
        .filter(
            Review.anime_id == anime_id
        )
        .order_by(
            Review.created_at.desc()
        )
        .all()
    )

    result = []

    for review, user in reviews:

        result.append({

            "review_id": review.review_id,

            "username": user.username,

            "review": review.review,

            "created_at": review.created_at

        })

    return result


from fastapi import HTTPException


def delete_review(
    db: Session,
    review_id: int,
    user_id: int
):

    review = (
        db.query(Review)
        .filter(
            Review.review_id == review_id,
            Review.user_id == user_id
        )
        .first()
    )

    if review is None:

        raise HTTPException(
            status_code=404,
            detail="Review not found."
        )

    db.delete(review)

    db.commit()

    return {

        "message": "Review deleted."

    }