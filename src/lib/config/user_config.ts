import * as t from '@withgraphite/retype';
import { composeConfig } from './compose_config';

const schema = t.shape({
  branchPrefix: t.optional(t.string),
  authToken: t.optional(t.string),
  tips: t.optional(t.boolean),
  editor: t.optional(t.string),
});

export const userConfigFactory = composeConfig({
  schema,
  defaultLocations: [
    {
      relativePath: '.graphite_user_config',
      relativeTo: 'USER_HOME',
    },
  ],
  initialize: () => {
    return {};
  },
  helperFunctions: (data, update) => {
    return {};
  },
});
