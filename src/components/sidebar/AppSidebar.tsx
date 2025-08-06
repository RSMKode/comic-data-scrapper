import { Sidebar, SidebarRail } from "../ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import { AppSidebarContent } from "./AppSidebarContent";
import { AppSidebarFooter } from "./AppSidebarFooter";
import { getSessionUser } from "@/app/(auth)/actions";

export default async function AppSidebar() {
  const sessionUser = await getSessionUser();

  return (
    <Sidebar collapsible="icon" className="z-20 border-accent-primary/50">
      <AppSidebarHeader />
      <SidebarRail className="hover:after:bg-accent-primary" />
      <AppSidebarContent sessionUser={sessionUser} />
      <AppSidebarFooter />
    </Sidebar>
  );
}
