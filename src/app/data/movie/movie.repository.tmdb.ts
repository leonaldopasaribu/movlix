import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FetchResponse } from '../base/response.model';
import { MovieVideoDtoTmdb } from './movie-video.dto.tmdb';
import { MovieDtoTmdb } from './movie.dto.tmdb';
import { MovieMapperTmdb } from './movie.mapper.tmdb';

import { MovieType } from 'src/app/core/entities/movie-type.enum';
import { MovieEntity } from 'src/app/core/entities/movie.entity';
import { MovieRepository } from 'src/app/core/repositories/movie.repositories';

import { AUTHORIZATION_HEADER } from 'src/app/shared/const/authorization.const';

@Injectable()
export class MovieRepositoryTmdb extends MovieRepository {
  private http = inject(HttpClient);
  private mapper = inject(MovieMapperTmdb);

  private readonly baseUrl: string;
  private readonly apiVersion: number;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    super();

    this.baseUrl = environment.tmdbApiUrl;
    this.apiVersion = 3;
  }

  override fetchAll(type: MovieType): Observable<MovieEntity[]> {
    const header = AUTHORIZATION_HEADER;
    const url = `${this.baseUrl}/${this.apiVersion}/movie/${type}`;

    return this.http
      .get<FetchResponse<MovieDtoTmdb[]>>(url, header)
      .pipe(
        map(({ results }: FetchResponse<MovieDtoTmdb[]>) =>
          results.map((dto: MovieDtoTmdb) => this.mapper.toEntity(dto)),
        ),
      );
  }

  override fetchOneById(movieId: number): Observable<MovieEntity> {
    const url = `${this.baseUrl}/${this.apiVersion}/movie/${movieId}`;
    const header = AUTHORIZATION_HEADER;

    return this.http
      .get<MovieDtoTmdb>(url, header)
      .pipe(map((dto: MovieDtoTmdb) => this.mapper.toEntity(dto)));
  }

  override fetchVideos(movieId: number): Observable<string | null> {
    const url = `${this.baseUrl}/${this.apiVersion}/movie/${movieId}/videos`;

    return this.http.get<MovieVideoDtoTmdb>(url, AUTHORIZATION_HEADER).pipe(
      map(response => {
        const youtubeTrailers = response.results.filter(
          video => video.site === 'YouTube' && video.type === 'Trailer',
        );

        const officialTrailer = youtubeTrailers.find(video => video.official);
        const selectedVideo = officialTrailer || youtubeTrailers[0];

        return selectedVideo
          ? `https://www.youtube.com/watch?v=${selectedVideo.key}`
          : null;
      }),
    );
  }
}
