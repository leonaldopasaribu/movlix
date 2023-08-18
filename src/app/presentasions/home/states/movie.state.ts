import { MovieEntity } from 'src/app/core/entities/movie.entity';

export class MovieState {
  isLoading = false;
  isError = false;
  errorMessage = '';
  nowPlayingMovies: MovieEntity[] = [];
  popularMovies: MovieEntity[] = [];
  topRatedMovies: MovieEntity[] = [];
  upComingMovies: MovieEntity[] = [];
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
