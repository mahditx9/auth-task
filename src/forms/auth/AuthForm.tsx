"use client";
import { HookFormField } from "@/components/form";
import { Button } from "@/components/ui";
import { useMutateData } from "@/hooks/useMutateData";
import { AuthSchema, AuthSchemaType } from "@/lib/schema";
import { loginQueryOption } from "@/services/query-options/user";
import { useAppDispatch } from "@/store";
import { loginUser } from "@/store/reducers/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import styles from "./AuthForm.module.scss";

export const AuthForm = () => {
  const router = useRouter();
  const methods = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
    mode: "onChange",
  });
  // const { data, isLoading, isError, refetch } = useQuery(
  //   loginQueryOption(false)
  // );
  const dispatch = useAppDispatch();
  const { mutate: loginUserCallback } = useMutateData<UserResponse, unknown>({
    method: "GET",
    url: "/api",
    params: { results: "1", nat: "us" },
  });
  const { formState } = methods;
  const onSubmit: SubmitHandler<AuthSchemaType> = async (data) => {
    console.log(data);
    await loginUserCallback(null, {
      onSuccess: (data) => {
        if (data.results?.[0]) {
          toast.success("خوش آمدید");
          dispatch(loginUser(data.results?.[0]));
          router.replace("/dashboard");
        }
      },
      onError: (err) => {
        toast.error("خطا در اتصال");
      },
    });
  };
  return (
    <div className={styles.authFormWrapper}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={styles.authForm}
        >
          <HookFormField
            name="phone_number"
            label="شماره موبایل"
            type="tel"
            required
            placeholder="شماره موبایل خود را وارد کنید"
          />
          <Button
            variants="success"
            buttonType="submit"
            disabled={!formState.isValid || formState.isSubmitting}
          >
            ورود
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
