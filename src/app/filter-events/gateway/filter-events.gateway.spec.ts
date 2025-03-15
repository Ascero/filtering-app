import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IApiEventData } from '../interfaces/filter-events.interface';
import { FilterEventsGateway } from './filter-events.gateway';

const mockResponse: IApiEventData = {
  events: [
    {
      type: 'session_start',
      properties: [{ property: 'activity', type: 'string' }],
    },
  ],
};

describe('FilterEventsGateway', () => {
  let service: FilterEventsGateway;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilterEventsGateway,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(FilterEventsGateway);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get filter events from the API', () => {
    service.getFilterEvents().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'https://br-fe-assignment.github.io/customer-events/events.json',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
