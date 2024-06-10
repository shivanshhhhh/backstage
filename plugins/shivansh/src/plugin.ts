import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const shivanshPlugin = createPlugin({
  id: 'shivansh',
  routes: {
    root: rootRouteRef,
  },
});

export const ShivanshPage = shivanshPlugin.provide(
  createRoutableExtension({
    name: 'ShivanshPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
