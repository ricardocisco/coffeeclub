import "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      id: string | null;
      name: string | null;
      email: string | null;
      role: string | null;
    };
  }

  interface JWT {
    id: string;
    role: string;
  }
}
