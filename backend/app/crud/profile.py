from sqlalchemy.orm import Session

from app.models.user import User
from app.models.favorite import Favorite
from app.models.watchlist import Watchlist
from app.models.user_rating import UserRating
from app.models.review import Review


def get_profile(db: Session, user_id: int):

    user = (
        db.query(User)
        .filter(User.user_id == user_id)
        .first()
    )

    favorites = (
        db.query(Favorite)
        .filter(Favorite.user_id == user_id)
        .count()
    )

    watchlist = (
        db.query(Watchlist)
        .filter(Watchlist.user_id == user_id)
        .count()
    )

    ratings = (
        db.query(UserRating)
        .filter(UserRating.user_id == user_id)
        .count()
    )

    reviews = (
        db.query(Review)
        .filter(Review.user_id == user_id)
        .count()
    )

    return {
        "username": user.username,
        "email": user.email,
        "favorites": favorites,
        "watchlist": watchlist,
        "ratings": ratings,
        "reviews": reviews
    }