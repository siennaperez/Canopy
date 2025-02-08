import Constants from 'expo-constants';

const { auth0Domain, auth0ClientId } = Constants.manifest?.extra || {};



// Log the values for debugging
console.log('Auth0 Domain:', auth0Domain);
console.log('Auth0 Client ID:', auth0ClientId);

if (!auth0Domain || !auth0ClientId) {
  console.error('Auth0 domain or client ID is missing!');
  throw new Error('Missing Auth0 configuration');
}

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

export default auth0;
