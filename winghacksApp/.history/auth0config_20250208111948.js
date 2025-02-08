import { Auth0 } from 'react-native-auth0';
import Constants from 'expo-constants';

// Access the Auth0 values from Expo's app config
const { auth0Domain, auth0ClientId } = Constants.extra;

const auth0 = new Auth0({
  domain: auth0Domain,
  clientId: auth0ClientId,
});

export default auth0;
