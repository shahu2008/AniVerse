import time

from app.database.database import SessionLocal
from app.models.anime import Anime
from app.services.jikan_service import get_anime_details

db = SessionLocal()

try:

    anime_list = (
        db.query(Anime)
        .filter(
            Anime.members >= 50000,
            Anime.poster_url == None
        )
        .order_by(Anime.members.desc())
        .all()
    )

    total = len(anime_list)

    print(f"\nFound {total} anime.\n")

    for index, anime in enumerate(anime_list, start=1):

        print(f"[{index}/{total}] {anime.title}")

        try:

            details = get_anime_details(anime.anime_id)

            if details and details.get("images"):

                anime.poster_url = (
                    details["images"]["jpg"]["large_image_url"]
                )

                db.commit()

                print("✅ Saved\n")

            else:

                print("❌ No poster found\n")

        except Exception as e:

            print(f"❌ {e}\n")

        time.sleep(1)

finally:

    db.close()

print("🎉 Finished.")