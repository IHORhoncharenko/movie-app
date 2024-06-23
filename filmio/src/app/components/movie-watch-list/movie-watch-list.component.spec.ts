/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovieWatchListComponent } from './movie-watch-list.component';

describe('MovieWatchListComponent', () => {
  let component: MovieWatchListComponent;
  let fixture: ComponentFixture<MovieWatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieWatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieWatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
