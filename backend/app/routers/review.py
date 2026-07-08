from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.core.security import get_current_user

from app.crud.review import (
    add_review,
    get_my_reviews,
    get_anime_reviews,
    delete_review
)

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)


@router.post("/{anime_id}")
def create_review(
    anime_id: int,
    review_text: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return add_review(
        db,
        current_user.user_id,
        anime_id,
        review_text
    )


@router.get("/")
def my_reviews(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_my_reviews(
        db,
        current_user.user_id
    )
@router.get("/anime/{anime_id}")
def anime_reviews(
    anime_id: int,
    db: Session = Depends(get_db)
):

    return get_anime_reviews(
        db,
        anime_id
    )

@router.delete("/{review_id}")
def remove_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

   return delete_review(
    db,
    review_id,
    current_user.user_id
)