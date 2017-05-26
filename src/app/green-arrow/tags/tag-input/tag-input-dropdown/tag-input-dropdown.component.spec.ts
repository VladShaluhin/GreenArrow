import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagInputDropdownComponent } from './tag-input-dropdown.component';

describe('TagInputDropdownComponent', () => {
  let component: TagInputDropdownComponent;
  let fixture: ComponentFixture<TagInputDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagInputDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagInputDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
