"use client";

import { SessionUserT } from "@/app/(auth)/_core/auth.definitions";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ROUTES, RoutesT, RouteT } from "@/config/routes.config";
import { cn } from "@/lib/components.lib";
import { filterRoutesByPermissions } from "@/lib/routes.lib";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type AppSidebarContentProps = {
  sessionUser: SessionUserT;
};

export function AppSidebarContent({ sessionUser }: AppSidebarContentProps) {
  const pathname = usePathname();

  const sessionUserPermissions = sessionUser.permissions;

  const filteredRoutes = sessionUser.id
    ? filterRoutesByPermissions(
        ROUTES,
        sessionUserPermissions,
        sessionUser.roles
      )
    : [];
  console.log({ filteredRoutes, sessionUserPermissions });

  return sessionUser ? (
    <SidebarContent className="overflow-x-clip">
      {Object.entries(filteredRoutes).map(([key, item]) => {
        const { self, ...subRoutes } = item;

        if (self.type === "group")
          return (
            <SidebarGroup key={`sidebar-group-${self.name}-${self.path}`}>
              <SidebarGroupLabel className="gap-2">
                {self.icon && <self.icon />}
                {self.fullName}
              </SidebarGroupLabel>

              {Object.entries((subRoutes as RoutesT) ?? {})?.map(
                ([key, item]) => {
                  const { self, ...subRoutes } = item;
                  const isSectionActive = pathname.includes(self.path);
                  const isRouteActive = pathname.endsWith(self.path);

                  if (self.type === "section")
                    return (
                      <SidebarMenu key={self.name}>
                        <Collapsible
                          asChild
                          defaultOpen={isSectionActive || isRouteActive}
                          className="group/collapsible"
                        >
                          <SidebarMenuItem className="flex flex-col gap-1">
                            <SidebarMenuButton
                              tooltip={self.fullName}
                              className={cn(
                                isSectionActive &&
                                  "border-accent-primary bg-accent-primary/10 rounded-b-none border-b-2",
                                isRouteActive &&
                                  "border-accent-primary bg-accent-primary/25 rounded-b-none border-b-2"
                              )}
                              asChild
                            >
                              <Link href={self.path}>
                                {self.icon && <self.icon />}
                                <span>{self.fullName}</span>
                              </Link>
                            </SidebarMenuButton>
                            {Object.keys(subRoutes).length ? (
                              <>
                                {Object.values(subRoutes).some(
                                  (subRoute) =>
                                    (subRoute as RouteT).self.type ===
                                    "sub-section"
                                ) && (
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                                      <ChevronRight />
                                      <span className="sr-only">Toggle</span>
                                    </SidebarMenuAction>
                                  </CollapsibleTrigger>
                                )}
                                <CollapsibleContent>
                                  <SidebarMenuSub
                                    className={cn(
                                      "border-foreground/20",
                                      isSectionActive &&
                                        "border-accent-primary/50"
                                    )}
                                  >
                                    {Object.entries(
                                      (subRoutes as RoutesT) ?? {}
                                    )?.map(([key, subItem]) => {
                                      const { self, ...subRoutes } = subItem;

                                      const isSubRouteActive =
                                        pathname.endsWith(self.path);
                                      const isSubSectionActive =
                                        pathname.includes(self.path);

                                      if (self.type === "sub-section")
                                        return (
                                          <SidebarMenuSubItem
                                            key={self.fullName || self.name}
                                          >
                                            <SidebarMenuSubButton
                                              className={cn(
                                                isSubSectionActive &&
                                                  "border-accent-primary bg-accent-primary/10 rounded-b-none border-b-2",

                                                isSubRouteActive &&
                                                  "border-accent-primary bg-accent-primary/25 rounded-b-none border-b-2"
                                              )}
                                              asChild
                                            >
                                              <Link href={self.path}>
                                                {self.icon ? (
                                                  <self.icon />
                                                ) : (
                                                  item.self.icon && (
                                                    <item.self.icon />
                                                  )
                                                )}
                                                <span>{self.fullName}</span>
                                              </Link>
                                            </SidebarMenuSubButton>
                                          </SidebarMenuSubItem>
                                        );
                                    })}
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              </>
                            ) : null}
                          </SidebarMenuItem>
                        </Collapsible>
                      </SidebarMenu>
                    );
                }
              )}
            </SidebarGroup>
          );
      })}
    </SidebarContent>
  ) : null;
}
