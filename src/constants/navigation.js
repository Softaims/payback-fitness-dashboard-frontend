import { Crown, Coins, HelpCircle, Shield, FileText, Mail, LogOut, User } from "lucide-react";

export const navigationLinks = [
  {
    label: "Manage Subscriptions",
    path: "/dashboard",
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
    label: "FAQ's",
    path: "/faqs",
    icon: HelpCircle,
    exact: false,
  },
];

export const bottomNavigationLinks = [
  {
    label: "Privacy Policy",
    path: "/privacy-policy",
    icon: Shield,
    exact: false,
  },
  {
    label: "Terms & Conditions",
    path: "/terms-conditions",
    icon: FileText,
    exact: false,
  },
  {
    label: "Contact Us",
    path: "/contact-us",
    icon: Mail,
    exact: false,
  },
];
