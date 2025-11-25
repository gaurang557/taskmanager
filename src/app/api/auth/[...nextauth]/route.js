import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        // TODO: Replace with DB call
        if (credentials.email === "admin@test.com" &&
            credentials.password === "admin123") {
          return { id: 1, name: "Admin User", email: "admin@test.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };