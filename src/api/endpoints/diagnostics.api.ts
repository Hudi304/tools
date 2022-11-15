import { API } from "@/api";

export const undefinedApi = (): Promise<null> => {
  return API()
    .get(`/api/diagnostics/heartbeat`)
};
