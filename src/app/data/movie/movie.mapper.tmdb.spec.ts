import { TestBed } from '@angular/core/testing';

import { MovieDtoTmdb } from './movie.dto.tmdb';
import { MovieMapperTmdb } from './movie.mapper.tmdb';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

describe('MovieMapperTmdb', () => {
  let mapper: MovieMapperTmdb;

  const entityStub: MovieEntity = {
    backdropUrl: 'Test Backdrop Url',
    duration: 120,
    genre: [{ id: 1, name: 'Comedy' }],
    id: 1,
    isAdult: false,
    overview: 'Test Overview',
    posterUrl: 'Test Poster Url',
    rating: 8,
    releaseDate: '2023-10-12',
    title: 'Test Title',
  };

  const dtoStub: MovieDtoTmdb = {
    adult: false,
    backdrop_path: 'Test Backdrop Url',
    genres: [{ id: 1, name: 'Comedy' }],
    genre_ids: [1],
    id: 1,
    original_language: 'en',
    original_title: 'Test Original Title',
    overview: 'Test Overview',
    popularity: 12345,
    poster_path: 'Test Poster Url',
    release_date: '2023-10-12',
    runtime: 120,
    title: 'Test Title',
    video: false,
    vote_average: 8,
    vote_count: 1_000,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieMapperTmdb],
    });
  });

  beforeEach(() => {
    mapper = TestBed.inject(MovieMapperTmdb);
  });

  it('should create MovieMapperTmdb', () => {
    expect(mapper).toBeTruthy();
  });

  it('should transform MovieDtoTmdb to MovieEntity', () => {
    const result = mapper.toEntity(dtoStub);

    expect(result).toEqual(entityStub);
  });
});
