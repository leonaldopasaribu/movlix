import { TestBed } from '@angular/core/testing';

import { MovieDetailState } from '../states/movie-detail.state';
import { MovieDetailStore } from './movie-detail.store';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

describe('MovieDetailStore', () => {
  let store: MovieDetailStore;

  const movieStub: MovieEntity = {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDetailStore],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MovieDetailStore);
  });

  it('should create MovieDetailStore', () => {
    expect(store).toBeTruthy();
  });

  it('should set isLoading to true when markAsLoading is called', (done: DoneFn) => {
    store.markAsLoading();

    store.state$.subscribe({
      next: ({ isLoading }: MovieDetailState) => {
        expect(isLoading).toBeTrue();
        done();
      },
    });
  });

  it('should set isError to true when markAsError is called', (done: DoneFn) => {
    const stubErroMessage = 'Error';

    store.markAsError(stubErroMessage);

    store.state$.subscribe({
      next: ({ isError }: MovieDetailState) => {
        expect(isError).toBeTrue();
        done();
      },
    });
  });

  it('should set movie when saveMovieDetails is called', () => {
    store.saveMovieDetails(movieStub);

    store.state$.subscribe({
      next: ({ movie }: MovieDetailState) => {
        expect(movie).toEqual(movieStub);
      },
    });
  });
});
