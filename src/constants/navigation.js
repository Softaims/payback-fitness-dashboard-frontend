import { HelpCircle, Shield, FileText, Mail, LogOut } from "lucide-react";
import Crown from "../../public/icons/Crown.jsx";
import Dollar from "../../public/icons/Dollar.jsx";
import Profile from "../../public/icons/Profile.jsx";

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
    icon: Dollar,
    exact: false,
  },
  {
    label: "Profile",
    path: "/profile-settings",
    icon: Profile,
    exact: false,
  },
  {
    label: "Return to App",
    path: "/paybackfitness://signin",
    icon: Profile,
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
