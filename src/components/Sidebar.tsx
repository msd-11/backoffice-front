import * as React from "react";
import IconButton from "@/components/Sidebar/IconButton";
import {
  BarChartBig,
  Package,
  ClipboardList,
  ShoppingCart,
  LucideIcon,
  User2,
  Factory,
  Newspaper,
  Contact2,
  Users2,
  DoorClosed,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useLogout } from "@/lib/auth";

interface IProps {}

const Sidebar: React.FC<IProps> = () => {
  const location = useLocation();
  const logout = useLogout();
  return (
    <div className="flex z-10 left-0 top-0 h-screen w-fit text-white border-r p-4">
      <section
        className={"flex bg-white flex-col gap-4 items-center h-full p-4"}
      >
        <NavItem
          title="Dashboard"
          to="/"
          Icon={BarChartBig}
          selected={location.pathname === "/"}
        />
        <NavItem
          title="Produits"
          to="/produits"
          Icon={Package}
          selected={location.pathname.startsWith("/produits")}
        />
        <NavItem
          title="Commandes"
          to="/commandes"
          Icon={ShoppingCart}
          selected={location.pathname.startsWith("/commandes")}
        />
        <NavItem
          title="Fournisseurs"
          to="/fournisseurs"
          Icon={Factory}
          selected={location.pathname.startsWith("/fournisseurs")}
        />
        <NavItem
          title="Blogs"
          to="/blogs"
          Icon={Newspaper}
          selected={location.pathname.startsWith("/blogs")}
        />
        <NavItem
          title="Employés"
          to="/employes"
          Icon={Contact2}
          selected={location.pathname.startsWith("/employes")}
        />
        <NavItem
          title="Clients"
          to="/clients"
          Icon={Users2}
          selected={location.pathname.startsWith("/clients")}
        />

        <NavItem
          className={"absolute bottom-20"}
          title="Mon compte"
          to="/compte"
          Icon={User2}
          selected={location.pathname.startsWith("/compte")}
        />

        <button
          className="absolute bottom-5"
          onClick={() => {
            logout.mutate({});
          }}
        >
          <nav className={`flex p-4 rounded-2xl w-fit`}>
            <div className="grid grid-cols-[25px_126px] gap-4">
              <LogOut color="gray" />
              <p className={`text-gray-500`}>Se déconnecter</p>
            </div>
          </nav>
        </button>
      </section>
    </div>
  );
};

interface NavItemProps {
  title: string;
  to: string;
  Icon: LucideIcon;
  selected: boolean;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  title,
  to,
  Icon,
  selected,
  className = "",
}) => {
  return (
    <Link
      to={to}
      className={`nav-item ${selected ? "selected" : ""} ${className}`}
    >
      <IconButton title={title} Icon={Icon} selected={selected} />
    </Link>
  );
};

export default Sidebar;
