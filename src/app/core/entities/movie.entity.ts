import { GenreEntity } from './genre.entity';

export interface MovieEntity {
  backdropUrl: string;
  genre: GenreEntity[];
  id: number;
  isAdult: boolean;
  overview: string;
  posterUrl: string;
  rating: number;
  releaseDate: string;
  title: string;
}
