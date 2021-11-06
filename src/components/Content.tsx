
import { MovieCard } from './MovieCard';

import '../styles/global.scss';

import '../styles/sidebar.scss';
import '../styles/content.scss';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviePropsNew {
  genreId: number;
  genreTitle: string;
}

export function Content(props: MoviePropsNew) {

  const [selectedGenreId, setSelectedGenreId] = useState(props.genreId);

  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    setSelectedGenreId(props.genreId);
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

  }, [props]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {props.genreTitle}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}