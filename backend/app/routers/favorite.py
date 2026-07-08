from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.core.security import get_current_user
from app.models.favorite import Favorite
from app.crud.favorite import (
    add_favorite,
    get_favorites,
    remove_favorite
)

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)


@router.post("/{anime_id}")
def favorite_anime(
    anime_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return add_favorite(
        db,
        current_user.user_id,
        anime_id
    )


@router.get("/")
def my_favorites(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_favorites(
        db,
        current_user.user_id
    )
@router.get("/check/{anime_id}")
def check_favorite(
    anime_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    favorite = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == current_user.user_id,
            Favorite.anime_id == anime_id
        )
        .first()
    )

    return {
        "is_favorite": favorite is not None
    }


@router.delete("/{anime_id}")
def delete_favorite(
    anime_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

   return remove_favorite(
    db,
    current_user.user_id,
    anime_id
)
