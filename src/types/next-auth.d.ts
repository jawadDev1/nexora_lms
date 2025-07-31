import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    name?: string;
    email?: string;
    avatar: string;
    id: string;
    role: string;
    joined_at: string  ;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      joined_at: string | date;
      name?: string | null;
      email?: string | null;
      avatar: string ;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    joined_at: string;
    avatar: string
  }
}
