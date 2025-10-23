import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'MENUITEMS.COLLABORATEUR.TEXT',
    icon: 'bx-group',
    link: '/collaborateur',
    roles: ['admin', 'user', "manager"] 
  },
  {
    id: 3,
    label: 'MENUITEMS.DEPARTEMENT.TEXT',
    icon: 'bx-home-circle',
    link: '/departement',
    roles: ['admin', 'user', "manager"]
  },
  {
    id: 4,
    label: 'MENUITEMS.MANAGER.TEXT',
    icon: 'bx-user-circle',
    link: '/manager',
    roles: ['admin', 'user', "manager"]
  },
  {
    id: 5,
    label: 'MENUITEMS.COMPTE.TEXT',
    icon: 'bx-cog',
    link: '/compte',
    roles: ['admin', 'user', "manager"]
  },
  {
    id: 6,
    label: 'MENUITEMS.CONGE.TEXT',
    icon: 'bx-calendar',
    subItems: [
      {
        id: 7,
        label: 'MENUITEMS.STATUT_CONGES.TEXT',
        icon: 'bx-badge-check',
        link: '/statut-conges',
        parentId: 6,
        roles: ['admin','user', "manager"]
      },
      {
        id: 8,
        label: 'MENUITEMS.TYPE_CONGES.TEXT',
        icon: 'bx-list-ul',
        link: '/type-conges',
        parentId: 6,
        roles: ['admin', 'user', "manager"]
      },
      {
        id: 9,
        label: 'MENUITEMS.DEMANDE_CONGE.TEXT',
        icon: 'bx-clipboard',
        link: '/demande-conge',
        parentId: 6,
        roles: ['admin', 'user', "manager"]
      },
      {
        id: 10,
        label: 'MENUITEMS.SOLDE.TEXT',
        icon: 'bx-wallet',
        link: '/solde',
        parentId: 6,
        roles: ['admin', 'user', "manager"]
      }
    ]
  }
];
