import Constants from 'expo-constants';

const { auth0Domain, auth0ClientId } = Constants.manifest?.extra || {};



// Log the values for debugging
console.log('Auth0 Domain:', 'dev-870lb37ryyy22qz7.us.auth0.com');
console.log('Auth0 Client ID:', 'k0jYDQ1Z1odSnNLk8Rz0kWCcvZVm0Q3u');

if (!auth0Domain || !auth0ClientId) {
  console.error('Auth0 domain or client ID is missing!');
  throw new Error('Missing Auth0 configuration');
}

const auth0 = new Auth0({
  domain: auth0Domain,
  clientId: auth0ClientId,
});

export default auth0;
