import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoLateral } from './carrito-lateral';

describe('CarritoLateral', () => {
  let component: CarritoLateral;
  let fixture: ComponentFixture<CarritoLateral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoLateral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoLateral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
