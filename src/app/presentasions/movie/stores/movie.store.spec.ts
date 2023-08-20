import { TestBed } from '@angular/core/testing';

import { MovieStore } from './movie.store';

import { MovieState } from '../states/movie.state';
import { Movie } from '../models/movie.model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

describe('MovieStore', () => {
  let store: MovieStore;

  const nowPlayingMoviesStub: MovieEntity[] = [
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

  const popularMoviesStub: MovieEntity[] = [
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

  const topRatedMoviesStub: MovieEntity[] = [
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

  const upComingMoviesStub: MovieEntity[] = [
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

  const moviesStub: Movie = {
    nowPlayingMovies: nowPlayingMoviesStub,
    popularMovies: popularMoviesStub,
    topRatedMovies: topRatedMoviesStub,
    upComingMovies: upComingMoviesStub,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieStore],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MovieStore);
  });

  it('should create MovieStore', () => {
    expect(store).toBeTruthy();
  });

  it('should set isLoading to true when markAsLoading is called', (done: DoneFn) => {
    store.markAsLoading();

    store.state$.subscribe({
      next: ({ isLoading }: MovieState) => {
        expect(isLoading).toBeTrue();
        done();
      },
    });
  });

  it('should set isError to true when markAsError is called', (done: DoneFn) => {
    const stubErroMessage = 'Error';

    store.markAsError(stubErroMessage);

    store.state$.subscribe({
      next: ({ isError }: MovieState) => {
        expect(isError).toBeTrue();
        done();
      },
    });
  });

  it('should set isShowSuccessFavoriteDialog to true when openSuccessFavoriteDialog is called', (done: DoneFn) => {
    store.openSuccessFavoriteDialog();

    store.state$.subscribe({
      next: ({ isShowSuccessFavoriteDialog }: MovieState) => {
        expect(isShowSuccessFavoriteDialog).toBeTrue();
        done();
      },
    });
  });

  it('should set isShowSuccessFavoriteDialog to false when closeSuccessFavoriteDialog is called', (done: DoneFn) => {
    store.closeSuccessFavoriteDialog();

    store.state$.subscribe({
      next: ({ isShowSuccessFavoriteDialog }: MovieState) => {
        expect(isShowSuccessFavoriteDialog).toBeFalse();
        done();
      },
    });
  });

  it('should set nowPlayingMovies, popularMovies, topRatedMovies, upComingMovies, when populateMovies is called', () => {
    store.populateMovies(moviesStub);

    store.state$.subscribe({
      next: ({
        nowPlayingMovies,
        popularMovies,
        topRatedMovies,
        upComingMovies,
      }: MovieState) => {
        expect(nowPlayingMovies).toEqual(moviesStub.nowPlayingMovies);
        expect(popularMovies).toEqual(moviesStub.popularMovies);
        expect(topRatedMovies).toEqual(moviesStub.topRatedMovies);
        expect(upComingMovies).toEqual(moviesStub.upComingMovies);
      },
    });
  });
});
