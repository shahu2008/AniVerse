import { useEffect, useState } from "react";

import { getTopAnime } from "../api/animeApi";

import AnimeRow from "./AnimeRow";

function TopRatedSection() {

  const [anime, setAnime] = useState([]);

  useEffect(() => {

    const loadAnime = async () => {

      try {

        const data = await getTopAnime();

        setAnime(data);

      } catch (err) {

        console.error(err);

      }

    };

    loadAnime();

  }, []);

  return (

    <AnimeRow
      title="⭐ Top Rated"
      anime={anime}
    />

  );

}

export default TopRatedSection;