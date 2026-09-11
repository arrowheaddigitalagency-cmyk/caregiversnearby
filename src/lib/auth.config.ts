import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      const isLoginPage = pathname === "/admin/login";
      const isAdminRoute = pathname.startsWith("/admin");

      if (!isAdminRoute) return true;
      if (isLoginPage) return true;
      return isLoggedIn;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // role is set when Credentials provider returns it (Node runtime only)
        if ("role" in user && user.role) {
          token.role = user.role as never;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? token.sub ?? "");
        if (token.role) {
          session.user.role = token.role as typeof session.user.role;
        }
      }
      return session;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;
