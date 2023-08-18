import { MovieEntity } from 'src/app/core/entities/movie.entity';

export class MovieDetailState {
  isLoading = false;
  isError = false;
  errorMessage = '';
  movie: MovieEntity = {
    backdropUrl: '',
    duration: 0,
    genre: [],
    id: 0,
    isAdult: false,
    overview: '',
    posterUrl: '',
    rating: 0,
    releaseDate: '',
    title: '',
  };
}
