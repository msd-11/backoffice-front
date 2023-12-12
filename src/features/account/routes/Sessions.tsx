import * as React from "react";
import SessionItem from "../components/SessionItem";
import { useSessions } from "../api/getSessions";

interface IProps {}

const Sessions: React.FC<IProps> = () => {
  const sessionsQuery = useSessions();

  if (sessionsQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (!sessionsQuery.data) {
    return null;
  }

  return (
    <div>
      {sessionsQuery.data!.map((value) => {
        return <SessionItem session={value} />;
      })}
    </div>
  );
};

export default Sessions;
