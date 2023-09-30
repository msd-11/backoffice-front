import * as React from "react";
import IconButton from "./Sidebar/IconButton";
import {
    BarChartBig,
    Package,
    ClipboardList,
    ShoppingCart,
    LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface IProps {}

const Sidebar: React.FC<IProps> = () => {
    const location = useLocation();
    return (
        <div className="flex z-10 left-0 top-0 h-screen w-fit text-white border-r">
            <section
                className={
                    "flex bg-white flex-col gap-4 items-center h-full p-4"
                }
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
                    selected={location.pathname === "/produits"}
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
            </section>
        </div>
    );
};

interface NavItemProps {
    title: string;
    to: string;
    Icon: LucideIcon;
    selected: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ title, to, Icon, selected }) => {
    return (
        <Link to={to} className={`nav-item ${selected ? "selected" : ""}`}>
            <IconButton title={title} Icon={Icon} selected={selected} />
        </Link>
    );
};

export default Sidebar;
