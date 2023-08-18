import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class MovieRepositoryTmdb extends MovieRepository {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    private mapper: MovieMapperTmdb,
  ) {
    super();

    this.baseUrl = environment.tmdbApiUrl;
  }

  override fetchAll(type: MovieType): Observable<MovieEntity[]> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          `Bearer ` +
          'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmVjZTA3M2IyOWI3ZmUxNTE4ZDNhNDdjNjA2ZTY5MCIsInN1YiI6IjY0ZGViNzU1ZTE5ZGU5MDBlMzQyNmE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PpmFtn4cU4VvvqZyhIfJ2e7gnnqDnAqLo1H1dR_qqK4',
      }),
    };
    const version = 3;
    const url = `${this.baseUrl}/${version}/movie/${type}`;

    return this.http
      .get<FetchResponse<MovieDtoTmdb[]>>(url, header)
      .pipe(
        map(({ results }: FetchResponse<MovieDtoTmdb[]>) =>
          results.map((dto: MovieDtoTmdb) => this.mapper.toEntity(dto)),
        ),
      );
  }
}
