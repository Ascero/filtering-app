import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { findSelectedPropertiesByType } from '../../../shared/helper/find-selected-property.helper';
import { IFilterEvent } from '../../interfaces/filter-events.interface';
import { EventForm } from '../filter-events-form-builder/filter-events-form-builder.component';
import { FilterEventsPropertiesComponent } from '../filter-events-properties/filter-events-properties.component';
@Component({
  selector: 'app-filter-events-form-step',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FilterEventsPropertiesComponent,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './filter-events-form-step.component.html',
  styleUrl: './filter-events-form-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterEventsFormStepComponent {
  public readonly eventForm = input.required<FormGroup<EventForm>>();
  public readonly availableEvents = input.required<Array<IFilterEvent>>();
  public readonly eventIndex = input.required<number>();

  public readonly duplicateEvent = output<void>();
  public readonly removeEvent = output<void>();
  public readonly addProperty = output<void>();
  public readonly removeProperty = output<number>();
  public readonly updateProperty = output<{
    selectedPropertyType: 'string' | 'number' | null;
    propertyIndex: number;
  }>();

  public readonly availablePropertiesForSelectedEvent = linkedSignal(() => {
    return findSelectedPropertiesByType(
      this.eventForm().controls.type.value,
      this.availableEvents(),
    );
  });

  public updateAvailableProperties(event: MatSelectChange): void {
    const selectedEventProperties = findSelectedPropertiesByType(
      event.value,
      this.availableEvents(),
    );
    this.availablePropertiesForSelectedEvent.set(selectedEventProperties);

    this.eventForm().controls.properties.clear();
  }

  public addNewProperty(): void {
    this.addProperty.emit();
  }

  public removeExistingProperty(propertyIndex: number): void {
    this.removeProperty.emit(propertyIndex);
  }

  public updateExistingProperty(updatedProperty: {
    selectedPropertyType: 'string' | 'number' | null;
    propertyIndex: number;
  }) {
    this.updateProperty.emit(updatedProperty);
  }

  public duplicateExistingEvent(): void {
    this.duplicateEvent.emit();
  }

  public removeExistingEvent(): void {
    this.removeEvent.emit();
  }
}
