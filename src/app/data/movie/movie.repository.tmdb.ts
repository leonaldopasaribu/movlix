import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { MovieMapperTmdb } from './movie.mapper.tmdb';
import { MovieDtoTmdb } from './movie.dto.tmdb';

import { FetchResponse } from '../base/response.model';

import { MovieRepository } from 'src/app/core/repositories/movie.repositories';
import { MovieEntity } from 'src/app/core/entities/movie.entity';
import { MovieType } from 'src/app/core/entities/movie-type.enum';

import { environment } from 'src/environments/environment';

@Injectable()
export class ProvinceRepositoryInvestree extends MovieRepository {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    private mapper: MovieMapperTmdb,
  ) {
    super();

    this.baseUrl = environment.tmdbApiUrl;
  }

  override fetchAll(type: MovieType): Observable<MovieEntity[]> {
    const version = 3;

    const url = `${this.baseUrl}/${version}/movie/${type}`;

    return this.http
      .get<FetchResponse<MovieDtoTmdb[]>>(url)
      .pipe(
        map(({ results }: FetchResponse<MovieDtoTmdb[]>) =>
          results.map((dto: MovieDtoTmdb) => this.mapper.toEntity(dto)),
        ),
      );
  }
}
