import { FiHome, FiSettings, FiUser, FiUserPlus } from "react-icons/fi";
import { MdDomain, MdOutlineAddHomeWork, MdOutlineDomainAdd, MdOutlineHomeWork } from "react-icons/md";
import { GoRepo, GoRepoPush } from "react-icons/go";

export const IconsPadrão = [
  {
    id: 1,
    label: 'Usuarios',
    path: '/usuarios',
    icon: <FiUser />
  },
  {
    id: 2,
    label: 'Empreendimentos',
    path: '/empreendimentos',
    icon: <MdDomain />
  },
  {
    id: 3,
    label: 'Construtora',
    path: '/construtora',
    icon: <MdOutlineHomeWork />
  },
  {
    id: 4,
    label: 'CCAs',
    path: '/financeiras',
    icon: <GoRepo />
  },
  {
    id: 5,
    label: 'Add Empreendimento',
    path: '/financeiras',
    icon: <MdOutlineDomainAdd />
  },
  {
    id: 6,
    label: 'Add Construtora',
    path: '/construtora',
    icon: <MdOutlineAddHomeWork />
  },
  {
    id: 7,
    label: 'Add CCA',
    path: '/financeiras',
    icon: <GoRepoPush />
  },
  {
    id: 8,
    label: 'Add Usuario',
    path: '/usuarios',
    icon: <FiUserPlus />
  },
  {
    id: 9,
    label: 'Home',
    path: '/',
    icon: <FiHome />
  },
  {
    id: 10,
    label: 'Painel',
    path: '/adm',
    icon: <FiSettings />
  }
];
