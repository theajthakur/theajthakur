import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log(`[Auth] Attempting login for: ${email}`);

        // Check against environment variables
        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASS
        ) {
          console.log("[Auth] Credentials match. User authenticated.");
          return { id: "1", name: "Admin Code", email: email, role: "admin" };
        }

        console.log(
          "[Auth] Invalid credentials or environment variables missing."
        );
        console.log(
          `[Auth] Env check - Email set: ${!!process.env
            .ADMIN_EMAIL}, Pass set: ${!!process.env.ADMIN_PASS}`
        );

        // Return null if login fails
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login page on error
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
