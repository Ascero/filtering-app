import { Routes } from '@angular/router';

export const routes: Routes = [
  // NOTE: not that important in this case but it is a good practice to use lazy loading
  {
    path: '',
    loadComponent: () =>
      import(
        './filter-events/components/filter-events-form-builder/filter-events-form-builder.component'
      ).then((m) => m.FilterEventsFormBuilderComponent),
  },
];
