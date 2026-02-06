import { TestBed } from '@angular/core/testing';

import { MovieFavoriteState } from '../states/movie-favorite.state';
import { MovieFavoriteStore } from './movie-favorite.store';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

describe('MovieFavoriteStore', () => {
  let store: MovieFavoriteStore;

  const movieStub: MovieEntity[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieFavoriteStore],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MovieFavoriteStore);
  });

  it('should create MovieFavoriteStore', () => {
    expect(store).toBeTruthy();
  });

  it('should set isLoading to true when markAsLoading is called', (done: DoneFn) => {
    store.markAsLoading();

    store.state$.subscribe({
      next: ({ isLoading }: MovieFavoriteState) => {
        expect(isLoading).toBeTrue();
        done();
      },
    });
  });

  it('should set isError to true when markAsError is called', (done: DoneFn) => {
    const stubErroMessage = 'Error';

    store.markAsError(stubErroMessage);

    store.state$.subscribe({
      next: ({ isError }: MovieFavoriteState) => {
        expect(isError).toBeTrue();
        done();
      },
    });
  });

  it('should set favoriteMovies when saveFavoriteMovies is called', () => {
    store.saveFavoriteMovies(movieStub);

    store.state$.subscribe({
      next: ({ favoriteMovies }: MovieFavoriteState) => {
        expect(favoriteMovies).toEqual(movieStub);
      },
    });
  });
});
