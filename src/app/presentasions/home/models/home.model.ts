import { MovieEntity } from 'src/app/core/entities/movie.entity';

export interface Movie {
  nowPlayingMovies: MovieEntity[];
  popularMovies: MovieEntity[];
  topRatedMovies: MovieEntity[];
  upComingMovies: MovieEntity[];
}
