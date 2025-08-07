"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserSelector } from "@/store/selectors";

export const Dashboard = () => {
  const router = useRouter();
  const user = useUserSelector();
  console.log(user);

  useEffect(() => {
    if (!user || !user.id) {
      router.replace("/auth");
    }
  }, [user, router]);

  if (!user || !user.id) return null;

  return <div>welcome user</div>;
};
