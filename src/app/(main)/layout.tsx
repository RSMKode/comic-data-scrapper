import { SidebarProvider } from "../../components/ui/sidebar";
import { SIDEBAR_STATE_KEY } from "@/config/main.config";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
// import { AppStockDialog } from "@/components/AppStockDialog";
import Header from "@/components/global/Header";
import AppSidebar from "@/components/sidebar/AppSidebar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultOpen =
    (await getCookie(SIDEBAR_STATE_KEY, { cookies })) === "true";
  console.log({ defaultOpen });

  return (
    // <AppContainer>
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="flex h-screen w-full flex-col items-center overflow-x-auto">
        <Header />
        <div className="flex h-full w-full flex-col items-center justify-between gap-6 overflow-y-auto">
          {children}
        </div>
      </div>
      {/* <AppStockDialog /> */}
    </SidebarProvider>
  );
}
