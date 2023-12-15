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
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface IProps {}

const Sidebar: React.FC<IProps> = () => {
  const location = useLocation();
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
          title="Tickets"
          to="/tickets"
          Icon={ClipboardList}
          selected={location.pathname === "/tickets"}
        />
        <NavItem
          title="Commandes"
          to="/orders"
          Icon={ShoppingCart}
          selected={location.pathname === "/orders"}
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
          className={"absolute bottom-5"}
          title="Mon compte"
          to="/account"
          Icon={User2}
          selected={location.pathname.startsWith("/account")}
        />
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
