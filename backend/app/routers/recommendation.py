from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.services.popularity import get_top_rated_anime
from app.services.content_based import get_similar_anime
from app.services.collaborative import recommend_by_user
from app.services.hybrid import hybrid_recommendation
from app.core.security import get_current_user
from app.services.recommend_me import recommend_for_current_user
router = APIRouter(
    prefix="/recommend",
    tags=["Recommendation"]
)


@router.get("/popular")
def popular(db: Session = Depends(get_db)):
    return get_top_rated_anime(db)


@router.get("/content/{title}")
def content(title: str, db: Session = Depends(get_db)):
    return get_similar_anime(db, title)


@router.get("/user/{user_id}")
def user(user_id: int, db: Session = Depends(get_db)):
    return recommend_by_user(db, user_id)


@router.get("/hybrid")
def hybrid(
    anime_title: str,
    user_id: int,
    db: Session = Depends(get_db)
):
    return hybrid_recommendation(
        db,
        anime_title,
        user_id
    )
@router.get("/me")
def recommend_me(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return recommend_for_current_user(
        db,
        current_user.user_id
    )