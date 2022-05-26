export const useNotification = () => {
  const notify = (text: string) => {
    switch (window.Notification.permission) {
      case "granted":
        new window.Notification(text);
        break;
      case "default":
        window.Notification.requestPermission();
        break;
      default:
    }
  };
  return { notify };
};
