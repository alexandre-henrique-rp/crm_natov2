import BotaoJuncao from "@/components/botoes/bt_juncao";
import FooterComponent from "@/components/footer";
import { GetSessionServer } from "@/lib/auth_confg";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const dynamic = 'force-dynamic';

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await GetSessionServer();
  return (

    <div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <BotaoJuncao session={session} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {children}
      </div>
      <FooterComponent />
    </div>
  );
}
