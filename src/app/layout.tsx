import { getServerSession } from "next-auth";
import NextAuSessionProvider from "./componentes/providers/session_provaiders";
import { Providers } from "./providers";
import { auth } from "@/lib/auth_confg";
import { redirect } from "next/navigation";
import Loading from "./loading";

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(auth);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const expiration = session ? session.expiration : 0;
  const expired = Date.now() > expiration * 1000;

  if (!session) {
    return (
      <Loading/>
    )
  }

  if (expired) {
   redirect("/login");
  }
  

  return (
    <html lang="pt-br">
      <body>
        <NextAuSessionProvider>
          <Providers>
            {children}
            </Providers>
        </NextAuSessionProvider>
      </body>
    </html>
  );
}
