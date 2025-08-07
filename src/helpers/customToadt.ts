import { ExternalToast, toast } from "sonner";

type ToastTypes = "success" | "info" | "error";

interface CustomToastProps {
  type: ToastTypes;
  message: string;
  //   icon?: {
  //     iconsType: LocalIconsType;
  //     iconClass?: string;
  //   };
  data?: ExternalToast;
}

export const customToast = ({
  type,
  message,
  //   icon,
  data,
}: CustomToastProps) => {
  const options = data || {};

  const toastOptions = {
    // icon: icon ? (
    //   <LocalIcon
    //     iconType={icon.iconsType}
    //     className={`h-5 w-5 ${icon.iconClass}`}
    //   />
    // ) : undefined,
    ...options,
  };

  switch (type) {
    case "success":
      //   playNotificationSound();
      toast.success(message, toastOptions);
      break;
    case "info":
      //   playNotificationSound();
      toast.info(message, toastOptions);
      break;
    case "error":
      //   playNotificationSound();
      toast.error(message, toastOptions);
      break;
    default:
      //   playNotificationSound();
      toast(message, toastOptions);
  }
};
