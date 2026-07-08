from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.core.security import get_current_user

from app.crud.profile import get_profile

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/")
def my_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_profile(
        db,
        current_user.user_id
    )