from pydantic import BaseModel


class AnimeResponse(BaseModel):
    anime_id: int
    title: str
    type: str
    episodes: int
    rating: float | None
    members: int
    poster: str | None

    class Config:
        from_attributes = True