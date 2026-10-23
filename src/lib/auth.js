import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins"
const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db(process.env.AUTH_DB_NAME || "super-shop");

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ,
  secret:
    process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },plugins: [
        jwt()
      ],
  session: {
  cookieCache: {
    enabled : true,
    strategy: 'jwt',
    maxAge: 5 * 24 * 60 * 60 // in secound 
  }
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        input: true,
      },

      location: {
        type: "string",
        input: true,
      },

      role: {
        type: "string",
        defaultValue: "buyer",
        input: false,
      },
   
      
    },
  },
});