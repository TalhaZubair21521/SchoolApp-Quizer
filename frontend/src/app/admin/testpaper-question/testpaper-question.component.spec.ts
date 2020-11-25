import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpaperQuestionComponent } from './testpaper-question.component';

describe('TestpaperQuestionComponent', () => {
  let component: TestpaperQuestionComponent;
  let fixture: ComponentFixture<TestpaperQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestpaperQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestpaperQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
