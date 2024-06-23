/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovieFavoriteListComponent } from './movie-favorite-list.component';

describe('MovieFavoriteListComponent', () => {
  let component: MovieFavoriteListComponent;
  let fixture: ComponentFixture<MovieFavoriteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieFavoriteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
