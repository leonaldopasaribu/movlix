import { Injectable } from '@angular/core';

import { MovieDtoTmdb } from './movie.dto.tmdb';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

import { EntityMapper } from 'src/app/shared/base/mapper';

@Injectable()
export class MovieMapperTmdb
  implements EntityMapper<MovieDtoTmdb, MovieEntity>
{
  toEntity(dto: MovieDtoTmdb): MovieEntity {
    return {
      backdropUrl: dto.backdrop_path,
      genre: dto.genres,
      id: dto.id,
      isAdult: dto.adult,
      overview: dto.overview,
      posterUrl: dto.poster_path,
      rating: dto.vote_average,
      releaseDate: dto.release_date,
      title: dto.title,
    };
  }
}
