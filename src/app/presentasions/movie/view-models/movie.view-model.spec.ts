import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MovieViewModel } from './movie.view-model';

import { MovieStore } from '../stores/movie.store';

import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { MovieRepository } from 'src/app/core/repositories/movie.repositories';

describe('MovieViewModel', () => {
  let viewModel: MovieViewModel;

  const movieStoreSpy = jasmine.createSpyObj('LoansStore', ['state', 'state$']);

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
  });

  it('should create MovieViewModel', () => {
    expect(viewModel).toBeTruthy();
  });
});
