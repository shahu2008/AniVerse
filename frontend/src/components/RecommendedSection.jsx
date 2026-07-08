import { useEffect, useState } from "react";

import { getHybridRecommendations } from "../api/recommendationApi";
import AnimeRow from "./AnimeRow";

function RecommendedSection() {

  const [anime, setAnime] = useState([]);

  useEffect(() => {

    const loadRecommendations = async () => {

      try {

        const data = await getHybridRecommendations(
          "Naruto",
          1
        );

        setAnime(data);

      } catch (err) {

        console.error(err);

      }

    };

    loadRecommendations();

  }, []);

  return (
    <AnimeRow
      title="🤖 Recommended For You"
      anime={anime}
    />
  );
}

export default RecommendedSection;