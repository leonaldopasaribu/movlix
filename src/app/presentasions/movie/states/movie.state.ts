import { MovieEntity } from 'src/app/core/entities/movie.entity';

export class MovieState {
  isLoading = false;
  isError = false;
  errorMessage = '';
  nowPlayingMovies: MovieEntity[] = [];
  popularMovies: MovieEntity[] = [];
  topRatedMovies: MovieEntity[] = [];
  upComingMovies: MovieEntity[] = [];
}
