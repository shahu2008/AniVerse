import notebook_setup
import pandas as pd


def get_db():
    from app.database.database import SessionLocal
    return SessionLocal()


def load_anime_dataset():
    return pd.read_csv("../dataset/anime.csv")


def load_rating_dataset():
    return pd.read_csv("../dataset/rating.csv")


def clean_anime_dataset(df):
    df["genre"] = df["genre"].fillna("Unknown")
    df["type"] = df["type"].fillna("Unknown")
    df["rating"] = df["rating"].fillna(0.0)

    df["episodes"] = (
        df["episodes"]
        .replace("Unknown", 0)
        .astype(int)
    )

    return df


def show_dataset_info(df):
    print("=" * 60)
    print("Shape:", df.shape)
    print("=" * 60)
    print(df.info())
    print("=" * 60)
    print(df.isnull().sum())