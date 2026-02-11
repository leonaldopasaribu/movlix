import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create CardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked event when image card is clicked', () => {
    spyOn(component.clicked, 'emit');

    fixture.detectChanges();

    const containerCard = debugElement.query(By.css('#CntrImageCard'));

    containerCard.triggerEventHandler('click', null);

    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should emit favoriteClicked event when icon favorite is clicked', () => {
    spyOn(component.favoriteClicked, 'emit');

    fixture.componentRef.setInput('hasFavorite', true);

    fixture.detectChanges();

    const containerCard = debugElement.query(By.css('#CntrFavoriteIcon'));

    const mockEvent = { stopPropagation: jasmine.createSpy('stopPropagation') };
    containerCard.triggerEventHandler('click', mockEvent);

    expect(component.favoriteClicked.emit).toHaveBeenCalled();
  });
});
