import { Observable } from 'rxjs';

import { MovieType } from '../entities/movie-type.enum';
import { MovieEntity } from '../entities/movie.entity';

export abstract class MovieRepository {
  abstract fetchAll(type: MovieType): Observable<MovieEntity[]>;
  abstract fetchOneById(movieId: number): Observable<MovieEntity>;
  abstract fetchVideos(movieId: number): Observable<string | null>;
}
