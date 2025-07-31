import { encode, decode, Secret, JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXT_AUTH_SECRET,
} from "@/constants";
import {
  getLoginUser,
  GoogleSignup,
  resendEmail,
} from "@/modules/auth/services";
import { comparePassword } from "@/utils/hash";
import { Session, User } from "next-auth";

export const authOptions = {
  secret: NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt" as Secret,
  },
  jwt: { encode, decode },

  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const googleProfile = {
          ...profile,
          image: profile.picture,
          name: profile.name,
        };
        const response = await getLoginUser({ email: profile.email });

        if (!response.success) {
          throw new Error(response.message);
        }

        const user = response.data;

        if (!user?.email) {
          const response = await GoogleSignup({
            name: profile.name,
            email: profile.email,
            avatar: profile.picture,
          });

          const user = response.data;
          return {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: "USER",
            id: user.id,
            joined_at: user.created_at.toISOString(),
          };
        }

        return {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: "USER",
          id: user.id,
          joined_at: user.created_at.toISOString(),
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Passord",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const response = await getLoginUser({ email: credentials.email });

        if (!response?.success) {
          throw new Error(response.message);
        }

        const user = response.data;

        if (!user) {
          throw new Error("Could not find your account, Please create one");
        }

        const passwordValidity = await comparePassword(
          credentials.password,
          user.password
        );

        if (!user || !passwordValidity) {
          throw new Error("Invalid credentials");
        }

        if (!user?.verified) {
          resendEmail({ email: user.email });
          throw new Error(`E401 email:${user?.email}`);
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          joined_at: user.created_at.toISOString(),
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }: { user: User }) {
      if (user) {
        return true;
      }
      return false;
    },
    jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.joined_at = user.joined_at;
        token.avatar  = user.avatar;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (token.role) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.joined_at = token.joined_at;
        session.user.avatar = token.avatar
      }
      return session;
    },

    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
  },
};
