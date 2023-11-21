import * as React from "react";
import { LucideIcon } from "lucide-react";

interface IProps {
  title: string;
  Icon: LucideIcon;
  selected: boolean;
}

const IconButton: React.FC<IProps> = ({ title, Icon, selected }) => {
  return (
    <nav
      className={`flex ${selected ? "bg-primary" : ""} p-4 rounded-2xl w-fit`}
    >
      <div className="grid grid-cols-[25px_125px] gap-4">
        <Icon color={selected ? "white" : "gray"} />
        <p className={`${selected ? "text-white" : "text-gray-500"}`}>
          {title}
        </p>
      </div>
    </nav>
  );
};

export default IconButton;
