import { TestBed } from '@angular/core/testing';
import { StatutCongeService } from './solde.service';


describe('StatutCongeService', () => {
  let service: StatutCongeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatutCongeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
