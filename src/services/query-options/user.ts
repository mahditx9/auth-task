import { clientApi } from "@/api/fetcher";
import { UseQueryOptions } from "@tanstack/react-query";

export const loginQueryOption = (enabled: boolean) => {
  const queryOption: UseQueryOptions<User> = {
    queryKey: [ServerQueryKeysEnum.FETCH_USER],
    queryFn: () =>
      clientApi<any>({
        url: `/api/?results=1&nat=us`,
      }),
    gcTime: 0,
    staleTime: 0,
    enabled,
  };
  return queryOption;
};
