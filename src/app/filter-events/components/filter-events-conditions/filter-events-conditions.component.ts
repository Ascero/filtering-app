import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NumberOperator } from '../../constants/number-operator.enum';
import { StringOperator } from '../../constants/string-operator.enum';
import { PropertyForm } from '../filter-events-form-builder/filter-events-form-builder.component';

@Component({
  selector: 'app-filter-events-conditions',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './filter-events-conditions.component.html',
  styleUrl: './filter-events-conditions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterEventsConditionsComponent {
  public readonly propertyForm = input.required<FormGroup<PropertyForm>>();

  public readonly conditionsForm = computed(
    () => this.propertyForm().controls.conditions,
  );

  public readonly stringOperators = Object.values(StringOperator);
  public readonly numberOperators = Object.values(NumberOperator);

  public readonly numberOperator = NumberOperator;
}
