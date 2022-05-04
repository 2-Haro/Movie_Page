import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovies(json.data.movie);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {
            <Movie
              key={movies.id}
              id={movies.id}
              coverImg={movies.medium_cover_image}
              title={movies.title}
              year={movies.year}
              summary={movies.description_full}
              genres={movies.genres}
            />
          }
        </div>
      )}
    </div>
  );
}

export default Detail;
