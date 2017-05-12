import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartQuickComponent } from './cart-quick.component';

describe('CartQuickComponent', () => {
  let component: CartQuickComponent;
  let fixture: ComponentFixture<CartQuickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartQuickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
