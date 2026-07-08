def jaccard_similarity(
    source_genres: set,
    target_genres: set
) -> float:
    """
    Calculate Jaccard Similarity between two genre sets.
    """

    intersection = source_genres.intersection(target_genres)
    union = source_genres.union(target_genres)

    if len(union) == 0:
        return 0.0

    return len(intersection) / len(union)