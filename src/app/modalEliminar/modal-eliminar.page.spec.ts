import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ModalEliminar } from './modal-eliminar.page';

describe('ModalEliminar', () => {
  let component: ModalEliminar;
  let fixture: ComponentFixture<ModalEliminar>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalEliminar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
