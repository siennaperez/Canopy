import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'YOUR_AUTH0_DOMAIN',  // Replace with your Auth0 domain
  clientId: 'YOUR_AUTH0_CLIENT_ID',  // Replace with your Auth0 client ID
});

export const loginWithAuth0 = async () => {
  try {
    const credentials = await auth0.auth.signInWithRedirect();
    return credentials;
  } catch (error) {
    console.error("Auth0 login error: ", error);
  }
};

export const logoutWithAuth0 = async () => {
  try {
    await auth0.auth.clearSession();
  } catch (error) {
    console.error("Auth0 logout error: ", error);
  }
};
