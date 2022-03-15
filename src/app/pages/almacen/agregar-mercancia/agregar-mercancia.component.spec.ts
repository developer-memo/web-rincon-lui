import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMercanciaComponent } from './agregar-mercancia.component';

describe('AgregarMercanciaComponent', () => {
  let component: AgregarMercanciaComponent;
  let fixture: ComponentFixture<AgregarMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMercanciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
