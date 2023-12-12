import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";
import { SessionFinal } from "../types";

export const deleteSession = ({ sessionId }: { sessionId: string }) => {
  return axios.delete(`/sessions/${sessionId}`);
};

type UseDeleteSessionOptions = {
  config?: MutationConfig<typeof deleteSession>;
};

export const useDeleteSession = ({ config }: UseDeleteSessionOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (deletedSession) => {
      await queryClient.cancelQueries({ queryKey: ["sessions"] });

      const previousSessions = queryClient.getQueryData<SessionFinal[]>([
        "sessions",
      ]);

      queryClient.setQueryData(
        ["sessions"],
        previousSessions?.filter(
          (session) => session.id !== deletedSession.sessionId
        )
      );

      return { previousSessions };
    },
    onError: (_, __, context: any) => {
      if (context?.previousSessions) {
        queryClient.setQueryData(["sessions"], context.previousSessions);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      addNotification({
        type: "success",
        title: "Session Deleted",
      });
    },
    ...config,
    mutationFn: deleteSession,
  });
};
