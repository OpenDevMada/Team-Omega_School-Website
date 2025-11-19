import { api } from "@/lib/api";
import type { Stat } from "@/types/statistic";

export const statisticService = {
  getGlobalStat: async () => {
    const res = await api.get<Stat[]>(`/dashboard/stat`, {
      withCredentials: true,
    });
    return res.data;
  },

  getByPeriod: async (period: string) => {
    const res = await api.get<Stat>(`/dashboard/stat/${period}`, {
      withCredentials: true,
    });
    return res.data;
  },

  getCurrent: async () => {
    const res = await api.get<Stat>(`/dashboard/stat/current`, {
      withCredentials: true,
    });
    return res.data;
  },
};
