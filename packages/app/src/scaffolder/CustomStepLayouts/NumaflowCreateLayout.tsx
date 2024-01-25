import React from 'react';
import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import {
  createScaffolderLayout,
  LayoutTemplate,
} from '@backstage/plugin-scaffolder-react';
import { Grid } from '@material-ui/core';

const NumaflowCreate: LayoutTemplate = ({ properties, description, title }) => {
  return (
    <>
      <h1>{title}</h1>
      <Grid container justifyContent="flex-end">
        {properties.map(prop => {
          return (
            <Grid item xs={12} key={prop.content.key}>
              {prop.content}
            </Grid>
          );
        })}
        {/* {properties.slice(0, mid).map(prop => (
          <Grid item xs={6} key={prop.content.key}>
            {prop.content}
          </Grid>
        ))}
        {properties.slice(mid).map(prop => (
          <Grid item xs={6} key={prop.content.key}>
            {prop.content}
          </Grid>
        ))} */}
      </Grid>
      {description}
    </>
  );
};

export const NumaflowCreateLayout = scaffolderPlugin.provide(
  createScaffolderLayout({
    name: 'NumaflowCreate',
    component: NumaflowCreate,
  }),
);
