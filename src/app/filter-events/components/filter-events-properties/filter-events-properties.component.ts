import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { findSelectedPropertyType } from '../../../shared/helper/find-selected-property.helper';
import { IEventProperty } from '../../interfaces/filter-events.interface';
import { FilterEventsConditionsComponent } from '../filter-events-conditions/filter-events-conditions.component';
import { EventForm } from '../filter-events-form-builder/filter-events-form-builder.component';

@Component({
  selector: 'app-filter-events-properties',
  imports: [
    ReactiveFormsModule,
    FilterEventsConditionsComponent,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './filter-events-properties.component.html',
  styleUrl: './filter-events-properties.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterEventsPropertiesComponent {
  public readonly eventForm = input.required<FormGroup<EventForm>>();
  public readonly eventProperties =
    input.required<Array<IEventProperty | null>>();

  public readonly addProperty = output<void>();
  public readonly updateProperty = output<{
    selectedPropertyType: IEventProperty['type'] | null;
    propertyIndex: number;
  }>();
  public readonly removeProperty = output<number>();

  public readonly formProperties = computed(
    () => this.eventForm().controls.properties.controls,
  );

  public addNewProperty(): void {
    this.addProperty.emit();
  }

  public updatePropertyType(
    event: MatSelectChange,
    propertyIndex: number,
  ): void {
    this.updateProperty.emit({
      selectedPropertyType: findSelectedPropertyType(
        event.value,
        this.eventProperties(),
      ),
      propertyIndex,
    });
  }

  public removeExistingProperty(index: number): void {
    this.removeProperty.emit(index);
  }
}
