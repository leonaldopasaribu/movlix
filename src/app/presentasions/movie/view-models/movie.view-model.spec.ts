import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { MovieViewModel } from './movie.view-model';

import { MovieStore } from '../stores/movie.store';

import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

import { MovieRepository } from 'src/app/core/repositories/movie.repositories';
import { MovieEntity } from 'src/app/core/entities/movie.entity';

describe('MovieViewModel', () => {
  let viewModel: MovieViewModel;
  let movieStore: MovieStore;
  let router: Router;

  const movieStoreSpy = jasmine.createSpyObj('MovieStore', [
    'closeSuccessFavoriteDialog',
    'state',
    'state$',
  ]);

  const movieRepositorySpy = jasmine.createSpyObj('MovieRepository', [
    'fetchAll',
  ]);

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
    'getItem',
    'setItem',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieViewModel,
        {
          provide: MovieStore,
          useValue: movieStoreSpy,
        },
        {
          provide: MovieRepository,
          useValue: movieRepositorySpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: LocalStorageService,
          useValue: localStorageServiceSpy,
        },
      ],
    });
  });

  beforeEach(() => {
    viewModel = TestBed.inject(MovieViewModel);
    movieStore = TestBed.inject(MovieStore);
    router = TestBed.inject(Router);
  });

  it('should create MovieViewModel', () => {
    expect(viewModel).toBeTruthy();
  });

  it('should return false as isLoading when subscribe to isLoading$', (done: DoneFn) => {
    const expectedValue = false;
    const mockMovieState = {
      isLoading: false,
    };
    const movieStore = of(mockMovieState);

    movieStoreSpy.state$ = movieStore;

    viewModel.isLoading$.subscribe(value => {
      expect(value).toEqual(expectedValue);
      done();
    });
  });

  it('should return false as isShowSuccessFavoriteDialog when subscribe to isShowSuccessFavoriteDialog$', (done: DoneFn) => {
    const expectedValue = false;
    const mockMovieState = {
      isShowSuccessFavoriteDialog: false,
    };
    const movieStore = of(mockMovieState);

    movieStoreSpy.state$ = movieStore;

    viewModel.isShowSuccessFavoriteDialog$.subscribe(value => {
      expect(value).toEqual(expectedValue);
      done();
    });
  });

  it('should return now playing movies as nowPlayingMovies when subscribe to nowPlayingMovies$', (done: DoneFn) => {
    const movieMock: MovieEntity[] = [
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
    const mockMovieState = {
      nowPlayingMovies: movieMock,
    };
    const movieStore = of(mockMovieState);

    movieStoreSpy.state$ = movieStore;

    viewModel.nowPlayingMovies$.subscribe(value => {
      expect(value).toEqual(movieMock);
      done();
    });
  });

  it('should return popular movies as popularMovies when subscribe to popularMovies$', (done: DoneFn) => {
    const movieMock: MovieEntity[] = [
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
    const mockMovieState = {
      popularMovies: movieMock,
    };
    const movieStore = of(mockMovieState);

    movieStoreSpy.state$ = movieStore;

    viewModel.popularMovies$.subscribe(value => {
      expect(value).toEqual(movieMock);
      done();
    });
  });

  it('should return top rated movies as topRatedMovies when subscribe to topRatedMovies$', (done: DoneFn) => {
    const movieMock: MovieEntity[] = [
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
    const mockMovieState = {
      topRatedMovies: movieMock,
    };
    const movieStore = of(mockMovieState);

    movieStoreSpy.state$ = movieStore;

    viewModel.topRatedMovies$.subscribe(value => {
      expect(value).toEqual(movieMock);
      done();
    });
  });

  it('should return up coming movies as upComingMovies when subscribe to upComingMovies$', (done: DoneFn) => {
    const movieMock: MovieEntity[] = [
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
    const mockMovieState = {
      upComingMovies: movieMock,
    };
    const movieStore = of(mockMovieState);

    movieStoreSpy.state$ = movieStore;

    viewModel.upComingMovies$.subscribe(value => {
      expect(value).toEqual(movieMock);
      done();
    });
  });

  it('should call navigateByUrl method with movie id 1 when redirectToMovieDetails method is called', () => {
    const movieId = 1;
    const expectedUrl = 'movie/1';
    const navigateByUrlSpy = router.navigateByUrl as jasmine.Spy;

    viewModel.redirectToMovieDetails(movieId);

    expect(navigateByUrlSpy).toHaveBeenCalledWith(expectedUrl);
  });

  it('should call closeSuccessFavoriteDialog method when onClickCloseSuccessFavoriteDialog method is called', () => {
    const closeSuccessFavoriteDialogSpy =
      movieStore.closeSuccessFavoriteDialog as jasmine.Spy;

    viewModel.onClickCloseSuccessFavoriteDialog();

    expect(closeSuccessFavoriteDialogSpy).toHaveBeenCalled();
  });
});
