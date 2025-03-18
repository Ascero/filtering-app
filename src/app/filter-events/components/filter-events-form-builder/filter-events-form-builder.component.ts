import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NumberOperator } from '../../constants/number-operator.enum';
import { StringOperator } from '../../constants/string-operator.enum';
import { FilterEventsGateway } from '../../gateway/filter-events.gateway';
import {
  IApiEventData,
  IEventProperty,
  IFilterEvent,
} from '../../interfaces/filter-events.interface';
import { FilterEventsFormStepComponent } from '../filter-events-form-step/filter-events-form-step.component';

export type EventForm = {
  type: FormControl<IFilterEvent['type'] | null>;
  properties: FormArray<FormGroup<PropertyForm>>;
};

export type PropertyForm = {
  property: FormControl<IEventProperty['property'] | null>;
  type: FormControl<IEventProperty['type'] | null>;
  conditions: FormGroup<ConditionsForm>;
};

export type ConditionsForm = {
  operator: FormControl<StringOperator | NumberOperator | null>;
  value: FormControl<string | number | null>;
};

@Component({
  selector: 'app-filter-events-form-builder',
  imports: [
    ReactiveFormsModule,
    FilterEventsFormStepComponent,
    MatButtonModule,
  ],
  templateUrl: './filter-events-form-builder.component.html',
  styleUrl: './filter-events-form-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// Went fort a smart/dumb approach, where this component the great majority of the logic and pass inputs to the children
export class FilterEventsFormBuilderComponent {
  public eventsForm = new FormGroup<{
    events: FormArray<FormGroup<EventForm>>;
  }>({
    events: new FormArray<FormGroup<EventForm>>([]),
  });

  // I was waiting for linkedSignal to finally be available so had to try, but maybe too early to use it in a project (?)
  public readonly selectedEvents = linkedSignal(
    () => this.eventsForm.controls.events,
  );

  public readonly availableFilterEvents: Signal<IApiEventData | undefined>;

  private readonly filterEventsGateway = inject(FilterEventsGateway);

  constructor() {
    this.availableFilterEvents = toSignal(
      this.filterEventsGateway.getFilterEvents$(),
    );
  }

  // Events` actions
  public addEvent(): void {
    this.selectedEvents.update((events: FormArray<FormGroup<EventForm>>) => {
      events.push(this.createEvent());
      return events;
    });
  }

  public removeEvent(index: number): void {
    this.selectedEvents.update((events: FormArray<FormGroup<EventForm>>) => {
      events.removeAt(index);

      return events;
    });
  }

  public duplicateEvent(eventIndex: number): void {
    const control = this.selectedEvents().at(eventIndex);

    this.selectedEvents().insert(eventIndex + 1, control);
  }

  public discardEvents(): void {
    this.selectedEvents().clear();
  }

  // Properties` actions
  public addProperty(eventIndex: number): void {
    const newPropertyFormGroup: FormGroup<PropertyForm> =
      new FormGroup<PropertyForm>({
        property: new FormControl<string | null>(null),
        type: new FormControl<IEventProperty['type'] | null>(null),
        conditions: new FormGroup<ConditionsForm>({
          operator: new FormControl<StringOperator | NumberOperator | null>(
            null,
          ),
          value: new FormControl<string | number | null>(null) as FormControl<
            string | number | null
          >,
        }),
      });

    this.selectedEvents().controls[eventIndex].controls.properties.push(
      newPropertyFormGroup,
    );
  }

  public updateExistingPropertyType(
    selectedProperty: {
      selectedPropertyType: IEventProperty['type'] | null;
      propertyIndex: number;
    },
    eventIndex: number,
  ) {
    if (selectedProperty.selectedPropertyType) {
      const propertiesFormControls =
        this.selectedEvents().controls[eventIndex].controls.properties.controls[
          selectedProperty.propertyIndex
        ].controls;

      propertiesFormControls.type.setValue(null);
      propertiesFormControls.conditions.reset();

      propertiesFormControls.type.setValue(
        selectedProperty.selectedPropertyType,
      );
    }
  }

  public removeProperty(propertyIndex: number, eventIndex: number): void {
    this.selectedEvents().controls[eventIndex].controls.properties.removeAt(
      propertyIndex,
    );
  }

  //Performing a console log of the whole form
  public logFormValue(): void {
    console.log(this.eventsForm.value);
  }

  private createEvent(): FormGroup<EventForm> {
    return new FormGroup<EventForm>({
      type: new FormControl<IFilterEvent['type'] | null>(null, {
        validators: [Validators.required],
      }),
      properties: new FormArray<FormGroup<PropertyForm>>([]),
    });
  }
}
