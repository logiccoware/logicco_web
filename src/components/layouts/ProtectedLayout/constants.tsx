import {
  IconBuildingBank,
  IconUserSquareRounded,
  IconCategory,
  IconListDetails,
} from "@tabler/icons-react";

export const NAVBAR_LINKS = [
  {
    link: "/app/accounts",
    i18Label: "Common.protectedLayout.navbars.links.accounts",
    icon: IconBuildingBank,
  },
  {
    link: "/app/payees",
    i18Label: "Common.protectedLayout.navbars.links.payees",
    icon: IconUserSquareRounded,
  },
  {
    link: "/app/categories",
    i18Label: "Common.protectedLayout.navbars.links.categories",
    icon: IconCategory,
  },
  {
    link: "/app/transactions",
    i18Label: "Common.protectedLayout.navbars.links.transactions",
    icon: IconListDetails,
  },
];
