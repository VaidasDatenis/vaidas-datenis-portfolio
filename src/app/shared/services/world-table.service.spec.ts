import { TestBed } from '@angular/core/testing';

import { WorldTableService } from './world-table.service';

describe('WorldTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorldTableService = TestBed.get(WorldTableService);
    expect(service).toBeTruthy();
  });
});
