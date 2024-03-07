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
import * as dayjs from "dayjs";

interface IProps {
  session: SessionFinal;
}

const SessionItem: React.FC<IProps> = ({ session }) => {
  const deleteSession = useDeleteSession({});

  return (
    <div className="relative border mt-5 ml-5 mr-10 p-5 flex flex-row rounded w-4/5">
      <div className="grid grid-cols-8 items-center">
        <p className="col-span-1 text-gray-500 break-words">
          {dayjs(session.createdAt).format("DD/MM/YYYY HH:mm")}
        </p>
        <span
          className={`col-span-1 fi fi-${
            session.countryCode === undefined
              ? "xx"
              : session.countryCode.toLowerCase()
          } w-10 h-10 ml-6`}
        ></span>
        <p>{session.ip}</p>
        <div className="flex col-span-2">
          <PanelTop />
          <p>{session.browser}</p>
        </div>
        <div className="flex col-span-1">
          <MapPin />
          <p>{session.city ?? "Inconnue"}</p>
        </div>
        <div className="flex col-span-2">
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
