import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MovieFavoriteStore } from '../stores/movie-favorite.store';
import { MovieFavoriteViewModel } from './movie-favorite.view-model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

import { LOCAL_STORAGE_FAVORITE_MOVIES_KEY } from 'src/app/shared/const/local-storage-key.const';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

describe('MovieFavoriteViewModel', () => {
  let viewModel: MovieFavoriteViewModel;
  let movieFavoriteStore: MovieFavoriteStore;
  let localStorageService: LocalStorageService;

  const movieFavoriteStoreSpy = jasmine.createSpyObj('MovieFavoriteStore', [
    'markAsLoading',
    'markAsError',
    'saveFavoriteMovies',
    'state',
    'state$',
  ]);

  const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
    'getItem',
    'setItem',
    'removeItem',
    'clear',
  ]);

  const movieMock1: MovieEntity = {
    backdropUrl: 'Test Backdrop Url 1',
    duration: 120,
    genre: [{ id: 1, name: 'Comedy' }],
    id: 1,
    isAdult: false,
    overview: 'Test Overview 1',
    posterUrl: 'Test Poster Url 1',
    rating: 8,
    releaseDate: '2023-10-12',
    title: 'Test Title 1',
  };

  const movieMock2: MovieEntity = {
    backdropUrl: 'Test Backdrop Url 2',
    duration: 150,
    genre: [{ id: 2, name: 'Action' }],
    id: 2,
    isAdult: false,
    overview: 'Test Overview 2',
    posterUrl: 'Test Poster Url 2',
    rating: 7.5,
    releaseDate: '2023-11-15',
    title: 'Test Title 2',
  };

  const favoriteMoviesMock: MovieEntity[] = [movieMock1, movieMock2];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieFavoriteViewModel,
        {
          provide: MovieFavoriteStore,
          useValue: movieFavoriteStoreSpy,
        },
        {
          provide: LocalStorageService,
          useValue: localStorageServiceSpy,
        },
      ],
    });
  });

  beforeEach(() => {
    viewModel = TestBed.inject(MovieFavoriteViewModel);
    movieFavoriteStore = TestBed.inject(MovieFavoriteStore);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should create MovieFavoriteViewModel', () => {
    expect(viewModel).toBeTruthy();
  });

  it('should return false as isLoading when subscribe to isLoading$', (done: DoneFn) => {
    const expectedValue = false;
    const mockMovieFavoriteState = {
      isLoading: false,
    };
    const movieFavoriteStore = of(mockMovieFavoriteState);

    movieFavoriteStoreSpy.state$ = movieFavoriteStore;

    viewModel.isLoading$.subscribe(value => {
      expect(value).toEqual(expectedValue);
      done();
    });
  });

  it('should return favorite movies when subscribe to favoriteMovies$', (done: DoneFn) => {
    const mockMovieFavoriteState = {
      favoriteMovies: favoriteMoviesMock,
    };
    const movieFavoriteStore = of(mockMovieFavoriteState);

    movieFavoriteStoreSpy.state$ = movieFavoriteStore;

    viewModel.favoriteMovies$.subscribe(value => {
      expect(value).toEqual(favoriteMoviesMock);
      done();
    });
  });

  it('should call getItem from localStorage when getFavoriteMovies method is called', () => {
    const getItemSpy = localStorageService.getItem as jasmine.Spy;

    localStorageServiceSpy.getItem.and.returnValue(favoriteMoviesMock);

    viewModel.getFavoriteMovies();

    expect(getItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_FAVORITE_MOVIES_KEY);
  });

  it('should call markAsLoading method when getFavoriteMovies method is called', () => {
    const markAsLoadingSpy = movieFavoriteStore.markAsLoading as jasmine.Spy;

    localStorageServiceSpy.getItem.and.returnValue(favoriteMoviesMock);

    viewModel.getFavoriteMovies();

    expect(markAsLoadingSpy).toHaveBeenCalled();
  });

  it('should call saveFavoriteMovies method with favorite movies when getFavoriteMovies method is called', () => {
    const saveFavoriteMoviesSpy =
      movieFavoriteStore.saveFavoriteMovies as jasmine.Spy;

    localStorageServiceSpy.getItem.and.returnValue(favoriteMoviesMock);

    viewModel.getFavoriteMovies();

    expect(saveFavoriteMoviesSpy).toHaveBeenCalledWith(favoriteMoviesMock);
  });

  it('should call saveFavoriteMovies with null when localStorage returns null', () => {
    const saveFavoriteMoviesSpy =
      movieFavoriteStore.saveFavoriteMovies as jasmine.Spy;

    localStorageServiceSpy.getItem.and.returnValue(null);

    viewModel.getFavoriteMovies();

    expect(saveFavoriteMoviesSpy).toHaveBeenCalledWith(null);
  });

  it('should call getItem from localStorage when removeFavoriteMovie method is called', () => {
    const getItemSpy = localStorageService.getItem as jasmine.Spy;

    localStorageServiceSpy.getItem.and.returnValue(favoriteMoviesMock);

    viewModel.removeFavoriteMovie(movieMock1);

    expect(getItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_FAVORITE_MOVIES_KEY);
  });

  it('should call setItem to localStorage with updated favorites when removeFavoriteMovie method is called', () => {
    const setItemSpy = localStorageService.setItem as jasmine.Spy;
    const expectedUpdatedFavorites = [movieMock2];

    localStorageServiceSpy.getItem.and.returnValue(favoriteMoviesMock);

    viewModel.removeFavoriteMovie(movieMock1);

    expect(setItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_FAVORITE_MOVIES_KEY,
      expectedUpdatedFavorites,
    );
  });

  it('should call saveFavoriteMovies with updated favorites when removeFavoriteMovie method is called', () => {
    const saveFavoriteMoviesSpy =
      movieFavoriteStore.saveFavoriteMovies as jasmine.Spy;
    const expectedUpdatedFavorites = [movieMock2];

    localStorageServiceSpy.getItem.and.returnValue(favoriteMoviesMock);

    viewModel.removeFavoriteMovie(movieMock1);

    expect(saveFavoriteMoviesSpy).toHaveBeenCalledWith(
      expectedUpdatedFavorites,
    );
  });

  it('should handle empty array when removeFavoriteMovie is called and localStorage returns null', () => {
    const setItemSpy = localStorageService.setItem as jasmine.Spy;
    const saveFavoriteMoviesSpy =
      movieFavoriteStore.saveFavoriteMovies as jasmine.Spy;

    localStorageServiceSpy.getItem.and.returnValue(null);

    viewModel.removeFavoriteMovie(movieMock1);

    expect(setItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_FAVORITE_MOVIES_KEY,
      [],
    );
    expect(saveFavoriteMoviesSpy).toHaveBeenCalledWith([]);
  });

  it('should not remove movie if it does not exist in favorites', () => {
    const setItemSpy = localStorageService.setItem as jasmine.Spy;
    const saveFavoriteMoviesSpy =
      movieFavoriteStore.saveFavoriteMovies as jasmine.Spy;
    const nonExistentMovie: MovieEntity = {
      ...movieMock1,
      id: 999,
    };

    localStorageServiceSpy.getItem.and.returnValue(favoriteMoviesMock);

    viewModel.removeFavoriteMovie(nonExistentMovie);

    expect(setItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_FAVORITE_MOVIES_KEY,
      favoriteMoviesMock,
    );
    expect(saveFavoriteMoviesSpy).toHaveBeenCalledWith(favoriteMoviesMock);
  });
});
