import { TestBed } from '@angular/core/testing';

import { FruitGuard } from './fruit.guard';

describe('FruitGuard', () => {
  let guard: FruitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FruitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
