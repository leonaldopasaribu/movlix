import { Observable } from 'rxjs';

import { MovieEntity } from '../entities/movie.entity';

export abstract class MovieRepository {
  abstract fetchAll(): Observable<MovieEntity[]>;
  abstract fetchOne(): Observable<MovieEntity>;
}
