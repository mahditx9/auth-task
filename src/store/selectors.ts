import { useAppSelector } from "./useAppSelector";

export const useUserSelector = () => {
  const user = useAppSelector((state) => state.user);
  return { ...user };
};
