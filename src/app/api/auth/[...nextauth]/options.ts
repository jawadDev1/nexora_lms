import { encode, decode, JWT, JWTOptions } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
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
import { AuthOptions, Session, User } from "next-auth";

export const authOptions: AuthOptions = {
  secret: NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: { encode, decode },

  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      async profile(profile) {
        try {
          const response = await getLoginUser({ email: profile.email });
          const user = response.data;
          return {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: "User",
            id: user.id,
            joined_at: user.created_at.toISOString(),
          };
        } catch (error) {
          const response = await GoogleSignup({
            name: profile.name,
            email: profile.email,
            avatar: profile.avatar_url,
          });

          const updatedUser = response.data;
          return {
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            role: "User",
            id: updatedUser.id,
            joined_at: updatedUser.created_at.toISOString(),
          };
        }
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        try {
          const response = await getLoginUser({ email: profile.email });
          const user = response.data;
          return {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: "User",
            id: user.id,
            joined_at: user.created_at.toISOString(),
          };
        } catch (error) {
          const response = await GoogleSignup({
            name: profile.name,
            email: profile.email,
            avatar: profile.picture,
          });

          const updatedUser = response.data;
          return {
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            role: "User",
            id: updatedUser.id,
            joined_at: updatedUser.created_at.toISOString(),
          };
        }
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
          user.password!
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
    jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User;
      trigger?: "signIn" | "signUp" | "update";
      session?: any;
    }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.joined_at = user.joined_at;
        token.avatar = user.avatar;
      }
      if (trigger === "update" && session?.user) {
        token.name = session.user.name ?? token.name;
        token.avatar = session.user.avatar ?? token.avatar;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (token.role) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.joined_at = token.joined_at;
        session.user.avatar = token.avatar;
      }
      return session;
    },

    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
  },
};
