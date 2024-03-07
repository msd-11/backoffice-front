import * as React from "react";
import { useMe } from "../api/getMe";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface IProps {}

const Account: React.FC<IProps> = () => {
  const me = useMe();

  if (me.isLoading) {
    return <p>Loading</p>;
  }

  const { puid, email, firstname, lastname, roles, disabled } = me.data!.data;
  return (
    <div className="p-6" data-color-mode="light">
      <p className="pb-6 text-2xl font-bold">Mon compte</p>
      <Link to={"sessions"}>
        <Button className="absolute right-6 top-6">Mes sessions</Button>
      </Link>

      <div>
        <p className="text-gray-700 mb-2 text-xl font-semibold">Email</p>
        <p className="text-gray-700 text-base my-2">{email}</p>
        <div className="w-full h-[1px] border-b my-4"></div>

        <p className="text-gray-700 my-2 text-xl font-semibold">Prénom</p>
        <p className="text-gray-700 text-base my-2">{firstname}</p>
        <div className="w-full h-[1px] border-b my-4"></div>

        <p className="text-gray-700 my-2 text-xl font-semibold">Nom</p>
        <p className="text-gray-700 text-base my-2">{lastname}</p>
        <div className="w-full h-[1px] border-b my-4"></div>

        <p className="text-gray-700 my-2 text-xl font-semibold">Rôles</p>
        <ul className="my-2">
          {roles.map((role) => (
            <li key={role.id} className="text-gray-700 text-base ml-0">
              - {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
            </li>
          ))}
        </ul>
        <div className="w-full h-[1px] border-b my-4"></div>

        <p className="text-gray-700 my-2 text-xl font-semibold">Status</p>

        <p className="text-gray-700 text-base my-2">
          {disabled ? "Désactivé" : "Activé"}
        </p>
      </div>
    </div>
  );
};

export default Account;
