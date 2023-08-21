import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieDetailComponent } from './movie-detail.component';

import { CardListComponent } from '../components/card-list.component';
import { MovieDetailViewModel } from '../view-models/movie-detail.view-model';

import { LoadingScreenModule } from 'src/app/shared/components/loading-screen';
import { HeaderModule } from 'src/app/shared/components/header';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let debugElement: DebugElement;
  let viewModel: MovieDetailViewModel;

  const movieDetailViewModelSpy = jasmine.createSpyObj('MovieDetailViewModel', [
    'fetchMovieDetails',
    'onClickBackToPreviousPage',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent, CardListComponent],
      imports: [LoadingScreenModule, HeaderModule],
      providers: [
        {
          provide: MovieDetailViewModel,
          useValue: movieDetailViewModelSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy('paramMap.get').and.returnValue('1'),
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    viewModel = TestBed.inject(MovieDetailViewModel);
  });

  it('should create MovieDetailComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should return 1 when trackByIndex is called with argument 1', () => {
    const stubArgument = 1;

    const result = component.trackByIndex(1);

    expect(result).toEqual(stubArgument);
  });

  it('should call onClickBackToPreviousPage from movie detail view model when Btn Back is clicked', () => {
    const onClickBackToPreviousPageSpy =
      viewModel.onClickBackToPreviousPage as jasmine.Spy;

    fixture.detectChanges();

    const btnBack = debugElement.query(By.css('#BtnBack'));

    btnBack.triggerEventHandler('click', null);

    expect(onClickBackToPreviousPageSpy).toHaveBeenCalled();
  });

  it('should call fetchMovieDetails from movie detail view model when component executed', () => {
    const movieId = 1;
    const fetchMovieDetailsSpy = viewModel.fetchMovieDetails as jasmine.Spy;

    fixture.detectChanges();

    expect(fetchMovieDetailsSpy).toHaveBeenCalledWith(movieId);
  });
});
