import { TestBed } from '@angular/core/testing';
import { DemandeCongesService } from './demande-conges.service';


describe('DemandeCongesService', () => {
  let service: DemandeCongesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeCongesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
