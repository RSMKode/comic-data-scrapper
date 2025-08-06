"use client";
import { cn } from "@/lib/components.lib";
import { MainLogo } from "../global/MainLogo";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";

export default function AppSidebarHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeader
      className={cn("items-center", isCollapsed ? "flex-col" : "flex-row")}
    >
      <SidebarMenu>
        <SidebarMenuButton
          size={"lg"}
          tooltip={"Sipel"}
          className="border-accent-primary bg-accent-primary/70 text-accent-primary-foreground hover:bg-accent-primary-foreground/90 hover:text-accent-primary justify-center border-2 group-data-[collapsible=icon]:justify-normal group-data-[collapsible=icon]:p-1.5! hover:brightness-110"
          asChild
        >
          <Link href="/">
            <MainLogo
              className="[&_svg]:group-data-[collapsible=icon]:size-5"
              showIcon={state === "collapsed"}
            />
          </Link>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarHeader>
  );
}
