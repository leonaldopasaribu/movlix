import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MovieRepositoryTmdb } from './movie.repository.tmdb';
import { MovieMapperTmdb } from './movie.mapper.tmdb';
import { MovieDtoTmdb } from './movie.dto.tmdb';

import { FetchResponse } from '../base/response.model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';
import { MovieType } from 'src/app/core/entities/movie-type.enum';

import { environment } from 'src/environments/environment';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('MovieRepositoryTmdb', () => {
  let httpTestingController: HttpTestingController;
  let repository: MovieRepositoryTmdb;
  let mapper: MovieMapperTmdb;

  const movieMapperTunaikuSpy = jasmine.createSpyObj('MovieMapperTmdb', [
    'toEntity',
  ]);

  const movieEntityMock: MovieEntity[] = [
    {
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
    },
  ];

  const movieMockResponse: FetchResponse<MovieDtoTmdb[]> = {
    page: 1,
    results: [
      {
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
      },
    ],
    total_pages: 1,
    total_results: 1,
  };

  const baseUrl = `${environment.tmdbApiUrl}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MovieRepositoryTmdb,
        {
          provide: MovieMapperTmdb,
          useValue: movieMapperTunaikuSpy,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(MovieRepositoryTmdb);
    mapper = TestBed.inject(MovieMapperTmdb);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create MovieRepositoryTmdb', () => {
    expect(repository).toBeTruthy();
  });

  it(`should call ${baseUrl}/3/movie/now_playing when method fetchAll with argument MovieType Now Playing is called`, (done: DoneFn) => {
    const movieType = MovieType.NowPlaying;
    const url = `${baseUrl}/3/movie/${movieType}`;
    const toEntitySpy = mapper.toEntity as jasmine.Spy;
    const expectedUrl = url;

    toEntitySpy.and.returnValue(movieEntityMock);

    repository.fetchAll(movieType).subscribe({
      next: () => done(),
      error: fail,
    });

    const request = httpTestingController.expectOne(url);
    const result = request.request.url;

    expect(result).toBe(expectedUrl);

    request.flush(movieMockResponse);
  });

  it(`should call get on httpClient when method fetchAll with argument MovieType Now Playing is called`, (done: DoneFn) => {
    const movieType = MovieType.NowPlaying;
    const url = `${baseUrl}/3/movie/${movieType}`;
    const toEntitySpy = mapper.toEntity as jasmine.Spy;
    const expectedMethod = 'GET';

    toEntitySpy.and.returnValue(movieEntityMock);

    repository.fetchAll(movieType).subscribe({
      next: () => done(),
      error: fail,
    });

    const request = httpTestingController.expectOne(url);
    const result = request.request.method;

    expect(result).toBe(expectedMethod);

    request.flush(movieMockResponse);
  });

  it(`should call ${baseUrl}/3/movie/1 when method fetchOneById with 1 is called`, (done: DoneFn) => {
    const movieId = 1;
    const url = `${baseUrl}/3/movie/${movieId}`;
    const toEntitySpy = mapper.toEntity as jasmine.Spy;
    const expectedUrl = url;

    toEntitySpy.and.returnValue(movieEntityMock[0]);

    repository.fetchOneById(movieId).subscribe({
      next: () => done(),
      error: fail,
    });

    const request = httpTestingController.expectOne(url);
    const result = request.request.url;

    expect(result).toBe(expectedUrl);

    request.flush(movieMockResponse);
  });

  it(`should call get on httpClient when method fetchOneById with argument 1 is called`, (done: DoneFn) => {
    const movieId = 1;
    const url = `${baseUrl}/3/movie/${movieId}`;
    const toEntitySpy = mapper.toEntity as jasmine.Spy;
    const expectedMethod = 'GET';

    toEntitySpy.and.returnValue(movieEntityMock[0]);

    repository.fetchOneById(movieId).subscribe({
      next: () => done(),
      error: fail,
    });

    const request = httpTestingController.expectOne(url);
    const result = request.request.method;

    expect(result).toBe(expectedMethod);

    request.flush(movieMockResponse);
  });
});
