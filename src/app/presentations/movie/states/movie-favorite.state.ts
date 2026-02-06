import { MovieEntity } from 'src/app/core/entities/movie.entity';

export class MovieFavoriteState {
  isLoading = false;
  isError = false;
  errorMessage = '';
  favoriteMovies: MovieEntity[] | null = [];
}
