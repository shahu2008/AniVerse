import requests

BASE_URL = "https://api.jikan.moe/v4"


def get_anime_details(mal_id: int):
    try:
        response = requests.get(
            f"{BASE_URL}/anime/{mal_id}",
            timeout=10
        )

        response.raise_for_status()

        return response.json()["data"]

    except requests.RequestException as e:
     print(f"Jikan Error for {mal_id}: {e}")
    return None