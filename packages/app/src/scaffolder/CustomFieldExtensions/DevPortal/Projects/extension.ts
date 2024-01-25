import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import {
  DevPortalProjectField,
  validateDevPortalProjectFieldValidation,
} from './DevPortalProjectField';

export const DevPortalProjectFieldExtension: any = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'DevPortalProjectField',
    component: DevPortalProjectField,
    validation: validateDevPortalProjectFieldValidation,
  }),
);
