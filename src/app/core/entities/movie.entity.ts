import { GenreEntity } from './genre.entity';

export interface MovieEntity {
  backdropUrl: string;
  duration: number;
  genre: GenreEntity[];
  id: number;
  isAdult: boolean;
  overview: string;
  posterUrl: string;
  rating: number;
  releaseDate: string;
  title: string;
}
