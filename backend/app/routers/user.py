from fastapi import APIRouter, Depends

from app.core.security import get_current_user

router = APIRouter(
    prefix="/user",
    tags=["User"]
)


@router.get("/me")
def get_profile(
    current_user=Depends(get_current_user)
):
    return {
        "user_id": current_user.user_id,
        "username": current_user.username,
        "email": current_user.email
    }