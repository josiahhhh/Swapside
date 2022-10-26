declare module "next-auth" {
  interface Session {
    user?: { email: string }; // Or whatever shape you have
  }
}
