import { useState } from "react";

export const useNotification = (maxCount: number) => {
  const [count, setCount] = useState<number>(maxCount);
  const notify = (text: string) => {
    if (count <= 0) return;
    switch (window.Notification.permission) {
      case "granted":
        new window.Notification(text);
        setCount((curr) => curr - 1);
        break;
      case "default":
        window.Notification.requestPermission();
        break;
      default:
    }
  };
  const reset = () => {
    setCount(maxCount);
  };
  return { notify, reset };
};
