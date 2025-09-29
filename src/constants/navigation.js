import { Crown, Coins, HelpCircle, Shield, FileText, Mail, LogOut, User } from "lucide-react";

export const navigationLinks = [
  {
    label: "Manage Subscriptions",
    path: "/",
    icon: Crown,
    exact: true,
  },
  {
    label: "PF Coins",
    path: "/pf-coins",
    icon: Coins,
    exact: false,
  },
  {
    label: "Profile",
    path: "/profile-settings",
    icon: User,
    exact: false,
  },
];

export const bottomNavigationLinks = [
  // {
  //   label: "Privacy Policy",
  //   path: "#",
  //   icon: Shield,
  //   exact: false,
  // },
  // {
  //   label: "Terms & Conditions",
  //   path: "#",
  //   icon: FileText,
  //   exact: false,
  // },
  // {
  //   label: "Contact Us",
  //   path: "#",
  //   icon: Mail,
  //   exact: false,
  // },
];
