import { FaRegQuestionCircle } from "react-icons/fa";
import { FiBarChart, FiFilePlus, FiHome, FiInfo, FiLogOut, FiSettings } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";

export const IconsMenu = [
  {
    label: "Home",
    path: "/",
    icon: <FiHome />,
  },
  {
    label: "Nova Solicitação",
    path: "/solicitacoes",
    icon: <FiFilePlus />,
  },
  {
    label: "Painel adm",
    path: "/adm",
    icon: <FiSettings />,
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    label: "FAQ",
    path: "/faq",
    icon: <FaRegQuestionCircle />,
  },
  {
    label: "Sair",
    path: "/sair",
    icon: <FiLogOut />,
  },
];