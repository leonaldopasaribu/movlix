import { Observable } from 'rxjs';

import { MovieEntity } from '../entities/movie.entity';
import { MovieType } from '../entities/movie-type.enum';

export abstract class MovieRepository {
  abstract fetchAll(type: MovieType): Observable<MovieEntity[]>;
}
