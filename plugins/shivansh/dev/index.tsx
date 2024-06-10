import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { shivanshPlugin, ShivanshPage } from '../src/plugin';

createDevApp()
  .registerPlugin(shivanshPlugin)
  .addPage({
    element: <ShivanshPage />,
    title: 'Root Page',
    path: '/shivansh',
  })
  .render();
