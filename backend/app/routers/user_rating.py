from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.core.security import get_current_user

from app.crud.user_rating import (
    add_rating,
    get_my_ratings,
    delete_rating,
    get_user_rating
)

router = APIRouter(
    prefix="/ratings",
    tags=["User Ratings"]
)


@router.post("/{anime_id}")
def rate_anime(
    anime_id: int,
    rating: float,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return add_rating(
        db,
        current_user.user_id,
        anime_id,
        rating
    )


@router.get("/")
def my_ratings(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_my_ratings(
        db,
        current_user.user_id
    )


@router.get("/{anime_id}")
def get_rating(
    anime_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_user_rating(
        db,
        current_user.user_id,
        anime_id
    )


@router.delete("/{rating_id}")
def remove_rating(
    rating_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return delete_rating(
        db,
        rating_id,
        current_user.user_id
    )