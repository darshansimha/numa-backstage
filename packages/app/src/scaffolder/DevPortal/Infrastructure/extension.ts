import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import {
  DevPortalInfrastructureField,
  validateDevPortalInfrastructureFieldValidation,
} from '../Infrastructure/DevPortalInfrastructureField';

export const DevPortalInfrastructureFieldExtension: any =
  scaffolderPlugin.provide(
    createScaffolderFieldExtension({
      name: 'DevPortalInfrastructureField',
      component: DevPortalInfrastructureField,
      validation: validateDevPortalInfrastructureFieldValidation,
    }),
  );
