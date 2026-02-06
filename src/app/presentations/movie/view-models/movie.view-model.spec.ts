import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { Movie } from '../models/movie.model';
import { MovieStore } from '../stores/movie.store';
import { MovieViewModel } from './movie.view-model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';
import { MovieRepository } from 'src/app/core/repositories/movie.repositories';

import { LOCAL_STORAGE_FAVORITE_MOVIES_KEY } from 'src/app/shared/const/local-storage-key.const';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

describe('MovieViewModel', () => {
  let viewModel: MovieViewModel;
  let movieStore: MovieStore;
  let router: Router;
  let localStorageService: LocalStorageService;

  const movieStoreSpy = jasmine.createSpyObj('MovieStore', [
    'markAsLoading',
    'markAsError',
    'populateMovies',
    'openSuccessFavoriteDialog',
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
    'clear',
  ]);

  const nowPlayingMoviesMock: MovieEntity[] = [
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

  const popularMoviesMock: MovieEntity[] = [
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

  const topRatedMoviesMock: MovieEntity[] = [
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

  const upComingMoviesMock: MovieEntity[] = [
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

  const movieMock: Movie = {
    nowPlayingMovies: nowPlayingMoviesMock,
    popularMovies: popularMoviesMock,
    topRatedMovies: topRatedMoviesMock,
    upComingMovies: upComingMoviesMock,
  };

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
    localStorageService = TestBed.inject(LocalStorageService);
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

  it('should call markAsLoading method when fetchMovies method is called', () => {
    const markAsLoadingSpy = movieStore.markAsLoading as jasmine.Spy;

    movieRepositorySpy.fetchAll.and.returnValues(
      of(nowPlayingMoviesMock),
      of(popularMoviesMock),
      of(topRatedMoviesMock),
      of(upComingMoviesMock),
    );

    viewModel.fetchMovies();

    expect(markAsLoadingSpy).toHaveBeenCalled();
  });

  it('should call populateMovies method when fetchMovies method is called', () => {
    const populateMoviesSpy = movieStore.populateMovies as jasmine.Spy;

    movieRepositorySpy.fetchAll.and.returnValues(
      of(nowPlayingMoviesMock),
      of(popularMoviesMock),
      of(topRatedMoviesMock),
      of(upComingMoviesMock),
    );

    viewModel.fetchMovies();

    expect(populateMoviesSpy).toHaveBeenCalledWith(movieMock);
  });

  it('should call markAsError method when fetchMovies method is called', () => {
    const markAsErrorSpy = movieStore.markAsError as jasmine.Spy;

    movieRepositorySpy.fetchAll.and.returnValues(
      throwError(() => new Error('Error')),
    );

    viewModel.fetchMovies();

    expect(markAsErrorSpy).toHaveBeenCalled();
  });

  it('should call openSuccessFavoriteDialog method when addFavoriteMovie with argument movie is called', () => {
    const movie = movieMock.nowPlayingMovies[0];

    const openSuccessFavoriteDialogSpy =
      movieStore.openSuccessFavoriteDialog as jasmine.Spy;

    viewModel.addFavoriteMovie(movie);

    expect(openSuccessFavoriteDialogSpy).toHaveBeenCalled();
  });

  it('should save a favorite movie to local storage when addFavoriteMovie is called', () => {
    const movie: MovieEntity = movieMock.nowPlayingMovies[0];
    const localStorageFavoriteMoviesKey = LOCAL_STORAGE_FAVORITE_MOVIES_KEY;
    const setItemSpy = localStorageService.setItem as jasmine.Spy;

    viewModel.addFavoriteMovie(movie);

    expect(setItemSpy).toHaveBeenCalledWith(localStorageFavoriteMoviesKey, [
      movie,
    ]);
  });
});
