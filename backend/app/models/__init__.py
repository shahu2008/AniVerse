from app.models.anime import Anime
from app.models.genre import Genre
from app.models.anime_genre import AnimeGenre
from app.models.user import User
from app.models.dataset_rating import DatasetRating
from app.models.user_rating import UserRating
from app.models.favorite import Favorite
from app.models.watchlist import Watchlist
from app.models.review import Review

__all__ = [
    "Anime",
    "Genre",
    "AnimeGenre",
    "User",
    "DatasetRating",
    "UserRating",
    "Favorite",
    "Watchlist",
    "Review",
]