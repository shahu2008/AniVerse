from pydantic import BaseModel


class RatingResponse(BaseModel):
    user_rating_id: int
    anime_id: int
    rating: float

    class Config:
        from_attributes = True