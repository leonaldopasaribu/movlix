import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { MovieDetailStore } from '../stores/movie-detail.store';
import { MovieDetailViewModel } from './movie-detail.view-model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';
import { MovieRepository } from 'src/app/core/repositories/movie.repositories';

describe('MovieDetailViewModel', () => {
  let viewModel: MovieDetailViewModel;
  let movieDetailStore: MovieDetailStore;
  let movieRepository: MovieRepository;
  let location: Location;

  const movieDetailStoreSpy = jasmine.createSpyObj('MovieDetailStore', [
    'markAsLoading',
    'markAsError',
    'saveMovieDetails',
    'state',
    'state$',
  ]);

  const movieRepositorySpy = jasmine.createSpyObj('MovieRepository', [
    'fetchOneById',
    'fetchVideos',
  ]);

  const locationSpy = jasmine.createSpyObj('Location', ['back']);

  const movieMock: MovieEntity = {
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

  const trailerUrlMock = 'https://www.youtube.com/watch?v=test123';

  const movieWithTrailerMock: MovieEntity = {
    ...movieMock,
    trailerUrl: trailerUrlMock,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieDetailViewModel,
        {
          provide: MovieDetailStore,
          useValue: movieDetailStoreSpy,
        },
        {
          provide: MovieRepository,
          useValue: movieRepositorySpy,
        },
        {
          provide: Location,
          useValue: locationSpy,
        },
      ],
    });
  });

  beforeEach(() => {
    viewModel = TestBed.inject(MovieDetailViewModel);
    movieDetailStore = TestBed.inject(MovieDetailStore);
    movieRepository = TestBed.inject(MovieRepository);
    location = TestBed.inject(Location);
  });

  it('should create MovieDetailViewModel', () => {
    expect(viewModel).toBeTruthy();
  });

  it('should return false as isLoading when subscribe to isLoading$', (done: DoneFn) => {
    const expectedValue = false;
    const mockMovieDetailState = {
      isLoading: false,
    };
    const movieDetailStore = of(mockMovieDetailState);

    movieDetailStoreSpy.state$ = movieDetailStore;

    viewModel.isLoading$.subscribe(value => {
      expect(value).toEqual(expectedValue);
      done();
    });
  });

  it('should return movie details when subscribe to movie$', (done: DoneFn) => {
    const mockMovieDetailState = {
      movie: movieMock,
    };
    const movieDetailStore = of(mockMovieDetailState);

    movieDetailStoreSpy.state$ = movieDetailStore;

    viewModel.movie$.subscribe(value => {
      expect(value).toEqual(movieMock);
      done();
    });
  });

  it('should call markAsLoading method when fetchMovieDetails method is called', () => {
    const movieId = 1;
    const markAsLoadingSpy = movieDetailStore.markAsLoading as jasmine.Spy;

    movieRepositorySpy.fetchOneById.and.returnValue(of(movieMock));
    movieRepositorySpy.fetchVideos.and.returnValue(of(trailerUrlMock));

    viewModel.fetchMovieDetails(movieId);

    expect(markAsLoadingSpy).toHaveBeenCalled();
  });

  it('should call fetchOneById with movieId when fetchMovieDetails method is called', () => {
    const movieId = 1;
    const fetchOneByIdSpy = movieRepository.fetchOneById as jasmine.Spy;

    movieRepositorySpy.fetchOneById.and.returnValue(of(movieMock));
    movieRepositorySpy.fetchVideos.and.returnValue(of(trailerUrlMock));

    viewModel.fetchMovieDetails(movieId);

    expect(fetchOneByIdSpy).toHaveBeenCalledWith(movieId);
  });

  it('should call fetchVideos with movieId when fetchMovieDetails method is called', () => {
    const movieId = 1;
    const fetchVideosSpy = movieRepository.fetchVideos as jasmine.Spy;

    movieRepositorySpy.fetchOneById.and.returnValue(of(movieMock));
    movieRepositorySpy.fetchVideos.and.returnValue(of(trailerUrlMock));

    viewModel.fetchMovieDetails(movieId);

    expect(fetchVideosSpy).toHaveBeenCalledWith(movieId);
  });

  it('should call saveMovieDetails method with movie and trailerUrl when fetchMovieDetails method is called successfully', () => {
    const movieId = 1;
    const saveMovieDetailsSpy =
      movieDetailStore.saveMovieDetails as jasmine.Spy;

    movieRepositorySpy.fetchOneById.and.returnValue(of(movieMock));
    movieRepositorySpy.fetchVideos.and.returnValue(of(trailerUrlMock));

    viewModel.fetchMovieDetails(movieId);

    expect(saveMovieDetailsSpy).toHaveBeenCalledWith(movieWithTrailerMock);
  });

  it('should call markAsError method when fetchMovieDetails method encounters an error', () => {
    const movieId = 1;
    const errorMessage = 'Error fetching movie details';
    const httpError = new HttpErrorResponse({
      error: 'Error',
      status: 404,
      statusText: 'Not Found',
      url: 'test-url',
    });

    Object.defineProperty(httpError, 'message', {
      value: errorMessage,
      writable: false,
    });

    const markAsErrorSpy = movieDetailStore.markAsError as jasmine.Spy;

    movieRepositorySpy.fetchOneById.and.returnValue(
      throwError(() => httpError),
    );

    viewModel.fetchMovieDetails(movieId);

    expect(markAsErrorSpy).toHaveBeenCalledWith(errorMessage);
  });

  it('should call location.back method when onClickBackToPreviousPage method is called', () => {
    const backSpy = location.back as jasmine.Spy;

    viewModel.onClickBackToPreviousPage();

    expect(backSpy).toHaveBeenCalled();
  });
});
