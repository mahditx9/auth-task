import { useUserSelector } from "@/store";
import React from "react";

export const User = () => {
  const user = useUserSelector();
  return <div>User</div>;
};
