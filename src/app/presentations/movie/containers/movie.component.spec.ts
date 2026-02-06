import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CardListComponent } from '../components/card-list.component';
import { HeroComponent } from '../components/hero.component';
import { MovieViewModel } from '../view-models/movie.view-model';
import { MovieComponent } from './movie.component';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

import { HeaderModule } from 'src/app/shared/components/header';
import { LoadingScreenModule } from 'src/app/shared/components/loading-screen';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let debugElement: DebugElement;
  let movieViewModel: MovieViewModel;

  const movieViewModelSpy = jasmine.createSpyObj('MovieViewModel', [
    'fetchMovies',
    'redirectToMovieDetails',
    'addFavoriteMovie',
    'onClickCloseSuccessFavoriteDialog',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoadingScreenModule,
        HeaderModule,
        MovieComponent,
        HeroComponent,
        CardListComponent,
      ],
      providers: [
        {
          provide: MovieViewModel,
          useValue: movieViewModelSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    movieViewModel = TestBed.inject(MovieViewModel);
  });

  it('should create MovieComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading screen when isLoading$ is true', () => {
    component.isLoading$ = of(true);

    fixture.detectChanges();

    const loadingScreenComponent = debugElement.query(
      By.css('app-loading-screen'),
    );

    expect(loadingScreenComponent).toBeTruthy();
  });

  it('should display header when isLoading$ is false', () => {
    component.isLoading$ = of(false);

    fixture.detectChanges();

    const headerComponent = debugElement.query(By.css('app-header'));

    expect(headerComponent).toBeTruthy();
  });

  it('should call fetchMovies method when component executed', () => {
    const fetchMoviesSpy = movieViewModel.fetchMovies as jasmine.Spy;

    fixture.detectChanges();

    expect(fetchMoviesSpy).toHaveBeenCalled();
  });

  it('should call redirectToMovieDetails method with movie id 1 when onCardClick method is called', () => {
    const movieIdStub = 1;
    const redirectToMovieDetailsSpy =
      movieViewModel.redirectToMovieDetails as jasmine.Spy;

    component.onCardClick(movieIdStub);

    expect(redirectToMovieDetailsSpy).toHaveBeenCalled();
  });

  it('should call addFavoriteMovie method when onIconLoveClick with movie mock is called', () => {
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
    const addFavoriteMovieSpy = movieViewModel.addFavoriteMovie as jasmine.Spy;

    component.onIconLoveClick(movieMock);

    expect(addFavoriteMovieSpy).toHaveBeenCalled();
  });

  it('should call onClickCloseSuccessFavoriteDialog method with movie id 1 when onCloseSuccessFavoriteDialogClick method is called', () => {
    const onClickCloseSuccessFavoriteDialogSpy =
      movieViewModel.onClickCloseSuccessFavoriteDialog as jasmine.Spy;

    component.onCloseSuccessFavoriteDialogClick();

    expect(onClickCloseSuccessFavoriteDialogSpy).toHaveBeenCalled();
  });
});
