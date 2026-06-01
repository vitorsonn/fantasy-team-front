import { TestBed } from '@angular/core/testing';

import { FantasyTeam } from './fantasy-team';

describe('FantasyTeam', () => {
  let service: FantasyTeam;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FantasyTeam);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
