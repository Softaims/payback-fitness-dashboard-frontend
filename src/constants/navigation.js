import { Crown, Coins, HelpCircle, Shield, FileText, Mail, LogOut, User } from "lucide-react";

export const navigationLinks = [
  {
    label: "Manage Subscriptions",
    path: "#",
    icon: Crown,
    exact: true,
  },
  {
    label: "PF Coins",
    path: "#",
    icon: Coins,
    exact: false,
  },
  {
    label: "FAQ's",
    path: "#",
    icon: HelpCircle,
    exact: false,
  },
];

export const bottomNavigationLinks = [
  {
    label: "Privacy Policy",
    path: "#",
    icon: Shield,
    exact: false,
  },
  {
    label: "Terms & Conditions",
    path: "#",
    icon: FileText,
    exact: false,
  },
  {
    label: "Contact Us",
    path: "#",
    icon: Mail,
    exact: false,
  },
];
