import { customToast } from "@/helpers";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// clientApi
export type NewClientApiParams<TError = unknown, TBody = unknown> = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  query?: Record<string, string>;
  headers?: Record<string, string>;
  body?: TBody;
  baseUrl?: string;
};

export async function clientApi<TData, TBody = unknown, TError = unknown>({
  url,
  method = "GET",
  query,
  headers,
  body,
  baseUrl: base,
}: NewClientApiParams<TError, TBody>): Promise<TData> {
  const baseUrl = base || process.env.NEXT_PUBLIC_BASE_URL;
  const header = { "Content-Type": "application/json", ...headers };
  let extractedQueries: string;

  if (!query) {
    extractedQueries = `${url}`;
  } else {
    const queryString = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&");
    extractedQueries = `${url}?${queryString}`;
  }

  const config: AxiosRequestConfig = {
    method: method,
    headers: header,
    url: `${baseUrl}${extractedQueries}`,
  };
  if (body) {
    config.data = body;
  }
  try {
    const results = await axios(config);
    return results.data as TData;
  } catch (error) {
    // if (error instanceof AxiosError) {
    //   if (error.response?.status === 401) {
    //     customToast({ type: "error", message: "لطفا وارد حساب خود شوید" });
    //   } else if (Number(error.response?.status) >= 500) {
    //     customToast({
    //       type: "error",
    //       message: "خطای سرور. لطفا دوباره تلاش کنید",
    //     });
    //   }

    //   const message = error.response?.data?.message || error.message;
    //   throw new Error(message || "خطا در ارسال درخواست") as TError;
    // } else {
    //   throw new Error("Unknown error occurred") as TError;
    // }
    if (error instanceof AxiosError) {
      const responseData = error.response?.data;

      if (error.response?.status === 401) {
        customToast({ type: "error", message: "لطفا وارد حساب خود شوید" });
      } else if (Number(error.response?.status) >= 500) {
        customToast({
          type: "error",
          message: "خطای سرور. لطفا دوباره تلاش کنید",
        });
      }

      // Return the full response data as error
      throw responseData || { message: error.message };
    } else {
      throw { message: "Unknown error occurred" };
    }
  }
}
