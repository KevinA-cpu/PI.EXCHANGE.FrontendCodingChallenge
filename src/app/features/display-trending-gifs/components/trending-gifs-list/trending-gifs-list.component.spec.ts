import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingGifsListComponent } from './trending-gifs-list.component';

describe('TrendingGifsListComponent', () => {
  let component: TrendingGifsListComponent;
  let fixture: ComponentFixture<TrendingGifsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingGifsListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingGifsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
