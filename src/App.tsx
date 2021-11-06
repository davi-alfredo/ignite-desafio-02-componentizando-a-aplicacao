import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import { useState } from 'react';
import { api } from './services/api';


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


export function App() {

  const genreChange = (genreId: number, genreTitle: string) => {
    setSelectedGenreId(genreId);
    setSelectedGenreTitle(genreTitle)

    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genreSelectedTitle, setSelectedGenreTitle] = useState("Ação");
  ;
  const [movies, setMovies] = useState<MovieProps[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar onGenreChange={genreChange} />
      <Content genreId={selectedGenreId} genreTitle={genreSelectedTitle} />
    </div>
  )
}
