export interface IEventProperty {
  property: string;
  type: 'string' | 'number';
}

export interface IFilterEvent {
  type:
    | 'session_start'
    | 'session_end'
    | 'page_visit'
    | 'purchase'
    | 'cart_update'
    | 'view_item';
  properties: IEventProperty[];
}

export interface IApiEventData {
  events: IFilterEvent[];
}
