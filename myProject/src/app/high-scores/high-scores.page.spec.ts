import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighScoresPage } from './high-scores.page';

describe('HighScoresPage', () => {
  let component: HighScoresPage;
  let fixture: ComponentFixture<HighScoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HighScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
