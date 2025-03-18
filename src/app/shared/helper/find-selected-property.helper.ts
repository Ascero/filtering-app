import {
  IEventProperty,
  IFilterEvent,
} from '../../filter-events/interfaces/filter-events.interface';

export function findSelectedPropertiesByType(
  type: string | null,
  availableEvents: Array<IFilterEvent>,
): Array<IEventProperty> {
  return (
    availableEvents.find((option: IFilterEvent) => {
      return option.type === type;
    })?.properties ?? []
  );
}

export function findSelectedPropertyType(
  selectedProperty: string,
  eventProperties: Array<IEventProperty | null>,
) {
  return (
    eventProperties.find((property) => property?.property === selectedProperty)
      ?.type ?? null
  );
}
