import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionQuestionComponent } from './revision-question.component';

describe('RevisionQuestionComponent', () => {
  let component: RevisionQuestionComponent;
  let fixture: ComponentFixture<RevisionQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
