import dotenv from 'dotenv';

dotenv.config(); // This will load variables from the .env file

export default {
  expo: {
    extra: {
      auth0Domain: process.env.AUTH0_DOMAIN,
      auth0ClientId: process.env.AUTH0_CLIENT_ID,
    },
  },
};
