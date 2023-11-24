import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import * as React from "react";

interface IProps {}

const SessionItem: React.FC<IProps> = () => {
  return (
    <div className="border w-fit p-5 flex flex-row">
      <div className="mr-4">
        <div className="flex">
          <p className="mr-2">Adresse IP</p>
          <p>125.255.255.255</p>
        </div>
        <div className="flex">
          <p className="mr-2">Navigateur</p>
          <p>Firefox</p>
        </div>
      </div>

      <div>
        <Button title="Révoquer">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default SessionItem;
