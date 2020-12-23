import { ToastStatus } from "../../enum/ToastStatus";

export function toast(message: string, color: string = ToastStatus.DEFAULT, duration: number = 2000) {
  const toast: any = document.createElement('ion-toast');
  toast.message = message;
  toast.duration = duration;
  toast.color = color;

  document.body.appendChild(toast);
  return toast.present()
}
