import { cookies } from "next/headers";
import { toast, Toaster } from "sonner";
import CookieFlashToaster from "./CookieFlashToaster";
import SearchParamsFlashToaster from "./SearchParamsFlashToaster";

export async function FlashToaster() {
  const flash = (await cookies()).get("flash");
  const theme = (await cookies()).get("theme");

  return (
    <>
      <Toaster
        richColors
        closeButton
        duration={4000}
        position="bottom-left"
        toastOptions={{
          classNames: {
            toast: "bg-muted text-foreground border-foreground/70",
          },
        }}
        theme="light"
      />

      <CookieFlashToaster />
      <SearchParamsFlashToaster />
    </>
  );
}
