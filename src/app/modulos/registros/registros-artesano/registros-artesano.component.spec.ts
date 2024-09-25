import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosArtesanoComponent } from './registros-artesano.component';

describe('RegistrosArtesanoComponent', () => {
  let component: RegistrosArtesanoComponent;
  let fixture: ComponentFixture<RegistrosArtesanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosArtesanoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrosArtesanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
