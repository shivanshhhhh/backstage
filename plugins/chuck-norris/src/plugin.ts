import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const chuckNorrisPlugin = createPlugin({
  id: 'chuck-norris',
  routes: {
    root: rootRouteRef,
  },
});

