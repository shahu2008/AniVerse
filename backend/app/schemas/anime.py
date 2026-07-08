from typing import Optional

from pydantic import BaseModel, ConfigDict


class AnimeBase(BaseModel):
    title: str
    type: str
    episodes: int
    rating: Optional[float] = None
    members: int


class AnimeCreate(AnimeBase):
    pass


class AnimeUpdate(BaseModel):
    title: Optional[str] = None
    type: Optional[str] = None
    episodes: Optional[int] = None
    rating: Optional[float] = None
    members: Optional[int] = None


class AnimeResponse(AnimeBase):
    anime_id: int

    model_config = ConfigDict(
        from_attributes=True
    )