import { MovieEntity } from 'src/app/core/entities/movie.entity';

export class MovieState {
  isLoading = false;
  isError = false;
  errorMessage = '';
  movies: MovieEntity[] = [];
}
