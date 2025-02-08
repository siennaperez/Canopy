// import React, { createContext, useState, useEffect, useContext } from "react";
// import { AuthSession } from "expo-auth-session";
// import * as SecureStore from "expo-secure-store";
// import Auth0 from "react-native-auth0";
// import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "../.env"; // Store secrets in .env
// import Constants from 'expo-constants';

// const { auth0Domain, auth0ClientId } = Constants.manifest?.extra || {};

// const auth0 = new Auth0({
//   domain: auth0Domain,
//   clientId: auth0ClientId,
// });

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadUser = async () => {
//       const token = await SecureStore.getItemAsync("authToken");
//       if (token) {
//         try {
//           const userInfo = await auth0.auth.userInfo({ token });
//           setUser(userInfo);
//         } catch (error) {
//           console.error("Error fetching user info:", error);
//           setUser(null);
//         }
//       }
//       setLoading(false);
//     };
//     loadUser();
//   }, []);

//   const login = async () => {
//     try {
//       const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
//       const { params } = await auth0.webAuth.authorize({
//         scope: "openid profile email",
//         audience: `https://${AUTH0_DOMAIN}/userinfo`,
//         redirectUri,
//       });
//       await SecureStore.setItemAsync("authToken", params.access_token);
//       const userInfo = await auth0.auth.userInfo({ token: params.access_token });
//       setUser(userInfo);
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   const logout = async () => {
//     await SecureStore.deleteItemAsync("authToken");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
