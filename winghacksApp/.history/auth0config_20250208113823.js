import Constants from 'expo-constants';

console.log('Constants manifest extra:', Constants.manifest.extra);


// Check if Constants.manifest.extra is available
const { auth0Domain, auth0ClientId } = Constants.manifest?.extra || {};

console.log('Constants manifest extra:', Constants.manifest.extra);


// Log the values for debugging
console.log('Auth0 Domain:', auth0Domain);
console.log('Auth0 Client ID:', auth0ClientId);

if (!auth0Domain || !auth0ClientId) {
  console.error('Auth0 domain or client ID is missing!');
  throw new Error('Missing Auth0 configuration');
}

const auth0 = new Auth0({
  domain: auth0Domain,
  clientId: auth0ClientId,
});

export default auth0;
