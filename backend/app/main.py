from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.anime import router as anime_router
from app.routers.recommendation import router as recommendation_router
from app.routers.auth import router as auth_router
from app.routers.user import router as user_router
from app.routers.favorite import router as favorite_router
from app.routers.watchlist import router as watchlist_router
from app.routers.user_rating import router as rating_router
from app.routers.review import router as review_router
from app.routers.genre import router as genre_router
from app.routers.profile import router as profile_router
app = FastAPI(
    title="Anime Recommendation API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ani-verse-eosin.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(review_router)
app.include_router(watchlist_router)
app.include_router(favorite_router)
app.include_router(user_router)
app.include_router(rating_router)

app.include_router(genre_router)
app.include_router(anime_router)
app.include_router(recommendation_router)
app.include_router(auth_router)
app.include_router(profile_router)


@app.get("/")
def root():
    return {
        "message": "Anime Recommendation System API"
    }