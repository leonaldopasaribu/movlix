import { Component, OnInit } from '@angular/core';
import { inject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'movlix';

  ngOnInit(): void {
    inject();
  }
}
