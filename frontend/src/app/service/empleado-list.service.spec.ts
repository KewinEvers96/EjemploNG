import { TestBed } from '@angular/core/testing';

import { EmpleadoListService } from './empleado-list.service';

describe('EmpleadoListService', () => {
  let service: EmpleadoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
