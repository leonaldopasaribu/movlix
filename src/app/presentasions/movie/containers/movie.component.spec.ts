import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { MovieComponent } from './movie.component';

import { HeroComponent } from '../components/hero.component';
import { CardListComponent } from '../components/card-list.component';
import { MovieViewModel } from '../view-models/movie.view-model';

import { LoadingScreenModule } from 'src/app/shared/components/loading-screen';
import { HeaderModule } from 'src/app/shared/components/header';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let debugElement: DebugElement;
  let movieViewModel: MovieViewModel;

  const movieViewModelSpy = jasmine.createSpyObj('MovieViewModel', [
    'fetchMovies',
    'redirectToMovieDetails',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieComponent, HeroComponent, CardListComponent],
      imports: [LoadingScreenModule, HeaderModule],
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
});
