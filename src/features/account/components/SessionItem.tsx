import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Button } from "@/components/ui/button";
import {
  Locate,
  MapPin,
  MonitorSmartphone,
  PanelTop,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { SessionFinal } from "../types";
import { deleteSession, useDeleteSession } from "../api/deleteSession";

interface IProps {
  session: SessionFinal;
}

const SessionItem: React.FC<IProps> = ({ session }) => {
  const deleteSession = useDeleteSession({});

  return (
    <div className="relative border mt-5 ml-5 mr-10 p-5 flex flex-row rounded w-3/4">
      <div className="grid grid-cols-8 items-center">
        <p className="col-span-2 text-gray-500">{session.id}</p>
        <span
          className={`fi fi-${session.countryCode.toLowerCase()} w-10 h-10`}
        ></span>
        <p>{session.ip}</p>
        <div className="flex">
          <PanelTop />
          <p>{session.browser}</p>
        </div>
        <div className="flex">
          <MapPin />
          <p>{session.city}</p>
        </div>
        <div className="flex">
          <MonitorSmartphone />
          <p>{session.deviceType}</p>
        </div>
      </div>

      <div className="absolute right-5 top-0 bottom-0 my-auto h-fit">
        <Button
          title="Révoquer"
          onClick={async () =>
            await deleteSession.mutateAsync({ sessionId: session.id })
          }
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default SessionItem;
