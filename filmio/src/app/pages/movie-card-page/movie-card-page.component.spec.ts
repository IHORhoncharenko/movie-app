/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovieCardPageComponent } from './movie-card-page.component';

describe('MovieCardPageComponent', () => {
  let component: MovieCardPageComponent;
  let fixture: ComponentFixture<MovieCardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
