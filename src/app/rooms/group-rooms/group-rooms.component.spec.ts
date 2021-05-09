import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRoomsComponent } from './group-rooms.component';

describe('GroupRoomsComponent', () => {
  let component: GroupRoomsComponent;
  let fixture: ComponentFixture<GroupRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
