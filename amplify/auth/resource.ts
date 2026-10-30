import { defineAuth } from '@aws-amplify/backend';

/**
 * The user pool is not shown in the UI. Guest guestbook access uses the
 * identity pool that Amplify creates alongside this auth resource.
 * See https://docs.amplify.aws/javascript/build-a-backend/data/customize-authz/public-data-access/
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
