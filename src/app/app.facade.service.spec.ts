import { TestBed } from '@angular/core/testing';
import { describe, expect,test } from '@jest/globals';
import { AppFacadeService } from './app.facade.service';

describe('AppFacadeService', () => {
  let appFacadeService: AppFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppFacadeService
      ],
    });

    appFacadeService = TestBed.inject(AppFacadeService);
  });

  test('should create the service', () => {
    expect(appFacadeService).toBeTruthy();
  });

});

