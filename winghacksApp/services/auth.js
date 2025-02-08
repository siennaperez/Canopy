// import Auth0 from 'react-native-auth0';
// import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '../auth0-config';

// const auth0 = new Auth0({
//   domain: AUTH0_DOMAIN,
//   clientId: AUTH0_CLIENT_ID
// });

// export const signUp = async (username, password, fullName) => {
//   try {
//     const credentials = await auth0.auth.createUser({
//       username,
//       password,
//       connection: 'Username-Password-Authentication',
//       name: fullName
//     });
//     return credentials;
//   } catch (error) {
//     throw error;
//   }
// };

// export const login = async (username, password) => {
//   try {
//     const credentials = await auth0.auth.passwordRealm({
//       username,
//       password,
//       realm: 'Username-Password-Authentication',
//       scope: 'openid profile'
//     });
//     return credentials;
//   } catch (error) {
//     throw error;
//   }
// };

// export const logout = async () => {
//   try {
//     await auth0.webAuth.clearSession();
//   } catch (error) {
//     throw error;
//   }
// };
