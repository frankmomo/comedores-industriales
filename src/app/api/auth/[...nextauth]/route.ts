import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Asegúrate que este archivo existe

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
