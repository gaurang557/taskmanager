import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/employees",
    "/tasks",
    "/employees/:path*",
    "/tasks/:path*"
  ]
};
