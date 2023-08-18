import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input()
  rating: number;

  @Input()
  posterUrl: string;

  @Input()
  title: string;

  @Output()
  clicked: EventEmitter<void>;

  constructor() {
    this.rating = 0;
    this.posterUrl = '';
    this.title = '';

    this.clicked = new EventEmitter();
  }

  onCardClick(): void {
    this.clicked.emit();
  }
}
