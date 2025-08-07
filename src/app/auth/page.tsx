import { AuthForm } from "@/forms/auth";
import React from "react";
import styles from "./AuthPage.module.scss";

const AuthPage = () => {
  return (
    <div className={styles.authPageWrapper}>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
