import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";

interface Props {
  url: string;
  data?: object | object[] | null;
  method: "GET" | "POST";
  keys: string[];
  enable: boolean;
}

export const useFetch = ({
  url,
  data,
  method = "GET",
  keys,
  enable = true,
}: Props) => {
  return useQuery({
    queryKey: keys || [url],
    queryFn: async () => {
      const config: AxiosRequestConfig = {
        method,
        url,
        data,
        withCredentials: true,
      };
      const response = await api.request(config);
      return response.data;
    },
    enabled: enable,
  });
};
