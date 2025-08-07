"use client";
import { clientApi, NewClientApiParams } from "@/api/fetcher";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface APIRequestConfig<TBody = unknown, TQuery = unknown> {
  url: string;
  method: RequestMethod;
  data?: TBody;
  baseUrl?: string;
  params?: TQuery;
  headers?: {
    accept?: string;
    "Content-Type"?: string;
  };
  is_authenticated?: boolean;
}

export const useMutateData = <
  TData,
  TBody = unknown,
  TQuery = unknown,
  TError = unknown
>(
  config: APIRequestConfig<TBody, TQuery>,
  options?: UseMutationOptions<TData, TError, TBody>
) => {
  return useMutation<TData, TError, TBody>({
    mutationFn: async (data: TBody) => {
      const baseUrl = config.baseUrl || process.env.NEXT_PUBLIC_BASE_URL;

      let fetcherConfig: NewClientApiParams<TError> = {
        method: config.method,
        headers: config.headers,
        url: config.url,
      };

      if (config.params) {
        fetcherConfig.query = config.params as Record<string, string>;
      }

      return clientApi<TData, TBody, TError>({
        ...fetcherConfig,
        baseUrl: baseUrl,
        method: config.method,
        body: data,
      });
    },
    ...options,
  });
};
