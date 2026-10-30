import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * Cognito is here so guestbook visitors can use the identity pool's
 * unauthenticated (guest) role. The site has no login screen.
 */
defineBackend({
  auth,
  data,
});
