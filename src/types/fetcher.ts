type FetcherResponse<TData = unknown, TError = unknown> = {
  data: TData | null;
  error: TError | null;
};

type FetcherError = {
  status: number;
  message: string;
  type: "CLIENT_ERROR" | "SERVER_ERROR" | "AUTH_ERROR" | "UNKNOWN_ERROR";
};
