from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.core.security import get_current_user
from app.models.watchlist import Watchlist

from app.crud.watchlist import (
    add_watchlist,
    get_watchlist,
    remove_watchlist
)

router = APIRouter(
    prefix="/watchlist",
    tags=["Watchlist"]
)


@router.post("/{anime_id}")
def add(
    anime_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return add_watchlist(
        db,
        current_user.user_id,
        anime_id
    )


@router.get("/")
def all_watchlist(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_watchlist(
        db,
        current_user.user_id
    )


@router.delete("/{anime_id}")
def delete(
    anime_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return remove_watchlist(
        db,
        current_user.user_id,
        anime_id
    )
@router.get("/check/{anime_id}")
def check_watchlist(
    anime_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    watchlist = (
        db.query(Watchlist)
        .filter(
            Watchlist.user_id == current_user.user_id,
            Watchlist.anime_id == anime_id
        )
        .first()
    )

    return {
        "is_watchlist": watchlist is not None
    }