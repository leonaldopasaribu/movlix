import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create HeroComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title "Movlix"', () => {
    const titleElement = compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent).toBe('Movlix');
  });

  it('should have correct CSS classes on title element', () => {
    const titleElement = compiled.querySelector('h1');
    expect(titleElement?.classList.contains('text-6xl')).toBe(true);
    expect(titleElement?.classList.contains('font-bold')).toBe(true);
    expect(titleElement?.classList.contains('text-gray-200')).toBe(true);
  });

  it('should render the description paragraph', () => {
    const paragraphElement = compiled.querySelector('p');
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement?.textContent?.trim()).toBe(
      'List of movies. There is a list of movies currently showing in theaters, popular, top rated and upcoming movies',
    );
  });

  it('should have correct CSS classes on paragraph element', () => {
    const paragraphElement = compiled.querySelector('p');
    expect(paragraphElement?.classList.contains('mt-4')).toBe(true);
    expect(paragraphElement?.classList.contains('text-base')).toBe(true);
    expect(paragraphElement?.classList.contains('font-semibold')).toBe(true);
    expect(paragraphElement?.classList.contains('text-gray-200')).toBe(true);
  });

  it('should render a container div', () => {
    const containerDiv = compiled.querySelector('div');
    expect(containerDiv).toBeTruthy();
  });

  it('should contain both title and paragraph elements', () => {
    const titleElement = compiled.querySelector('h1');
    const paragraphElement = compiled.querySelector('p');

    expect(titleElement).toBeTruthy();
    expect(paragraphElement).toBeTruthy();
  });
});
