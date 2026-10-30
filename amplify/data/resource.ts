import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * Paw-print guestbook.
 * Docs checked while writing this:
 * - https://docs.amplify.aws/javascript/build-a-backend/data/set-up-data/
 * - https://docs.amplify.aws/javascript/build-a-backend/data/customize-authz/public-data-access/
 * - https://docs.amplify.aws/javascript/build-a-backend/data/customize-authz/
 * - https://docs.amplify.aws/javascript/build-a-backend/data/field-level-validation/
 *
 * `allow.guest()` is the current recommendation for public data, because API keys expire.
 * Visitors may create and read paws. They cannot update or delete them.
 */
const schema = a.schema({
  PawPrint: a
    .model({
      message: a
        .string()
        .required()
        .validate((v) =>
          v.minLength(1, 'Write a short note').maxLength(140, 'Keep it to 140 characters'),
        ),
      costume: a.enum(['plain', 'pumpkin', 'ghost', 'witch']),
    })
    .authorization((allow) => [allow.guest().to(['create', 'read'])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});
