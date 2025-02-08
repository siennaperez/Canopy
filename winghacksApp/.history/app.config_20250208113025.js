import dotenv from 'dotenv';
dotenv.config();

export default {
  expo: {
    extra: {
      auth0Domain: process.env.AUTH0_DOMAIN,  // Loaded from .env
      auth0ClientId: process.env.AUTH0_CLIENT_ID,  // Loaded from .env
    },
  },
};
