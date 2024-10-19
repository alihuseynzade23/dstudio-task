import axios, { AxiosRequestConfig, AxiosError } from "axios";

interface AxiosBaseQueryArgs {
  url: string;
  method: string;
  body?: any;
  headers?: Record<string, string>;
}

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ url, method, body, headers }: AxiosBaseQueryArgs) => {
    try {
      const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

      const config: AxiosRequestConfig = {
        url: baseUrl + url,
        method,
        data: body,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const result = await axios(config);
      return { data: result.data };
    } catch (axiosError: unknown) {
      const error = axiosError as AxiosError;

      return {
        error: {
          status: error.response?.status || "FETCH_ERROR",
          data: error.response?.data || error.message,
        },
      };
    }
  };
