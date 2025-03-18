import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiEventData } from '../interfaces/filter-events.interface';

@Injectable({
  providedIn: 'root',
})
// Created this service to have it separated totally separated from the rest and just handle httpClient request here
export class FilterEventsGateway {
  private readonly filterEventUrl =
    'https://br-fe-assignment.github.io/customer-events/events.json';
  private readonly httpClient = inject(HttpClient);

  public getFilterEvents$(): Observable<IApiEventData> {
    return this.httpClient.get<IApiEventData>(this.filterEventUrl);
  }
}
