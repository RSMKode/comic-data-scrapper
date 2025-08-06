import { ToastT } from "sonner";

export type ExtendedToastT = ToastT & {
    pathname?: string;
}