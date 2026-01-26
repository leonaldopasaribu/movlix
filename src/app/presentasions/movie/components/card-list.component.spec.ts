import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CardListComponent } from '../components/card-list.component';

import { LoadingScreenModule } from 'src/app/shared/components/loading-screen';
import { HeaderModule } from 'src/app/shared/components/header';

import { MOVIE_URL } from 'src/app/shared/const/route-url.const';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;
  let router: Router;

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LoadingScreenModule, HeaderModule, CardListComponent],
    providers: [
        {
            provide: Router,
            useValue: routerSpy,
        },
    ],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create CardListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should return 1 when trackByIndex is called with argument 1', () => {
    const stubArgument = 1;

    const result = component.trackByIndex(1);

    expect(result).toEqual(stubArgument);
  });

  it('should emit favoriteClicked event when onFavoriteIconClick with movie stub is called', () => {
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

    spyOn(component.favoriteClicked, 'emit');

    component.onFavoriteIconClick(movieStub);

    expect(component.favoriteClicked.emit).toHaveBeenCalled();
  });

  it('should call navigateByUrl with "movie/1" when onCardClick method is called', () => {
    const movieIdStub = 1;
    const expectedUrl = `${MOVIE_URL}/${movieIdStub}`;
    const navigateByUrlSpy = router.navigateByUrl as jasmine.Spy;

    component.onCardClick(movieIdStub);

    expect(navigateByUrlSpy).toHaveBeenCalledWith(expectedUrl);
  });
});
