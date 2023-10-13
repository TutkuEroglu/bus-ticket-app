import { toast, ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { ReactNode } from "react";
import styles from "../../styles/alert.module.css";

interface NotificationProps {
    type: string;
    title: string | ReactNode;
    description?: string | ReactNode;
}

const types = ["success", "error", "info", "warning"] as const;
type ToastType = typeof types[number];

const checkType = (type: string): ToastType => {
  if (!type || typeof type !== "string" || !types.includes(type as ToastType)) {
    return "info";
  } else {
    return type as ToastType;
  }
};

export const sendMessage = (Notification: NotificationProps) => {
  if (!Notification?.type) {
    Notification.type = "info";
  } else {
    Notification.type = checkType(Notification.type);
  }
  displayMsg(Notification);
};

const displayMsg = ({ type, title, description }: NotificationProps) => {
  toast[type as ToastType](<div className={styles.NotificationWrapper}>
    <div className={styles.NotificationTitle}>{title}</div>
    {description && (
      <div className={styles.NotificationDescription}>{description}</div>
    )}
  </div>);
};

const toastConfig = {
  position: "top-center" as ToastPosition,
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  colored: true,
};

const Alerts: React.FC = () => {
  return (
    <ToastContainer {...toastConfig} />
  );
};

export default Alerts;