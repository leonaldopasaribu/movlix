import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
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

  it('should emit clicked event when card is clicked', () => {
    spyOn(component.clicked, 'emit');

    fixture.detectChanges();

    const containerCard = debugElement.query(By.css('#ImgPoster'));

    containerCard.triggerEventHandler('click', null);

    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
