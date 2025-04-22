import { IconsMenu } from "@/data/icons/menu";
import { MenuItem } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type BotaoMobileMenuProps = {
  name:
    | "Home"
    | "Painel adm"
    | "Nova Solicitação"
    | "Dashboard"
    | "FAQ"
    | "Sair";
};
export default function BotaoMobileMenu({ name }: BotaoMobileMenuProps) {
  const router = useRouter();
  const obj = IconsMenu.find((icon) => icon.label === name);
  const path = obj?.path;
  return (
    <>
      <MenuItem
        icon={obj?.icon}
        onClick={() => {
          if (name !== "Sair") {
            signOut({ redirect: false });
            router.push("/login");
          }
          router.push(obj?.path || "");
        }}
      >
        {name.toUpperCase()}
      </MenuItem>
    </>
  );
}
