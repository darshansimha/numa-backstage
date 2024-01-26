import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { CheckboxField, validateCheckboxFieldValidation } from './Checkboxes';

export const CheckboxFieldExtension: any = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'CheckboxField',
    component: CheckboxField,
    validation: validateCheckboxFieldValidation,
  }),
);
