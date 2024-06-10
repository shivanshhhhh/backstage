import {
  createPlugin,
  configApiRef,
  createApiFactory,
  discoveryApiRef,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { UselessFactsApiRef, UselessFactsApiClient } from './api';

import { rootRouteRef } from './routes';

import { Entity } from '@backstage/catalog-model';

import { USELESSFACT_TYPE } from './components/uselessfacts_helper';

export const uselessfactsPlugin = createPlugin({
  id: 'uselessfacts',
  apis: [
    createApiFactory({
      api: UselessFactsApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        configApi: configApiRef,
      },
      factory: ({ discoveryApi, configApi }) =>
        new UselessFactsApiClient({ discoveryApi, configApi }),
    }),
  ],  
  routes: {
    root: rootRouteRef,
  },
});

export const UselessFactsCard = uselessfactsPlugin.provide(
  createRoutableExtension({
    name: 'UselessFactsCard',
    component: () =>
      import('./components/UselessFactsComponent').then(m => m.UselessFactCard),
    mountPoint: rootRouteRef,
  }),
);

// And we export a flag to check if the annotation exists in the entity
export const isUselessFactAvailable = (entity: Entity) =>
  Boolean(entity?.metadata.annotations?.[USELESSFACT_TYPE]);