import { useEffect, useState } from "react";

import { getGenres, getAnimeByGenre } from "../api/genreApi";
import AnimeRow from "./AnimeRow";

function GenreSection() {

    const [genreRows, setGenreRows] = useState([]);

    useEffect(() => {

        const fetchGenres = async () => {

            try {

                const genres = await getGenres();
                const selectedGenres = genres.slice(0, 5);

                const rows = await Promise.all(

                    selectedGenres.map(async (genre) => {

                        const anime = await getAnimeByGenre(
                            genre.genre_name
                        );
                        console.log(genre.genre_name, anime);

                        return {
                            title: genre.genre_name,
                            anime
                        };

                    })

                );

                setGenreRows(rows);

            } catch (error) {

                console.error(error);

            }

        };

        fetchGenres();

    }, []);

    return (

        <>

            {genreRows.map((row) => (

                <AnimeRow
    key={row.title}
    title={row.title}
    anime={row.anime}
/>
            ))}

        </>

    );

}

export default GenreSection;