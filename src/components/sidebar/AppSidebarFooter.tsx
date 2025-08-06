import { getSessionUser } from "@/app/(auth)/actions";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getInitialsFromName } from "@/lib/presenters.lib";
import { ChevronsUpDown } from "lucide-react";
import { ExpertOneLogo } from "../icons/ExpertOneLogo";
import { ExpertOneLogoTiny } from "../icons/ExpertOneLogoTiny";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogoutButton } from "./LogoutButton";

export async function AppSidebarFooter() {
  const sessionUser = await getSessionUser();

  const UserAvatar = (
    <Avatar className="size-9 rounded-lg">
      <AvatarFallback className="font-semibol rounded-lg border-2 border-accent-primary bg-accent-primary/50 font-semibold text-foreground/80 transition hover:bg-accent-primary/80 hover:text-accent-primary-foreground">
        {sessionUser.token &&
          getInitialsFromName(sessionUser.name || sessionUser.username, 2)}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <SidebarFooter>
      <SidebarMenu>
        {sessionUser.token && (
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip={"Perfil"}
                  size={"lg"}
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {UserAvatar}
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {sessionUser.name}
                    </span>
                    <span className="truncate text-xs font-semibold text-accent-primary">
                      {sessionUser.database}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="border-accent-primary bg-background/70 w-[272px] max-w-[--radix-dropdown-menu-trigger-width] rounded-lg border-2 backdrop-blur-sm md:w-60"
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex max-w-full items-center gap-2 overflow-clip truncate p-1 text-left text-sm">
                    {UserAvatar}
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {sessionUser.name}
                      </span>
                      <span className="truncate text-xs font-semibold text-accent-primary">
                        {sessionUser.database}
                      </span>
                      <div className="flex flex-col gap-x-2 text-foreground/80">
                        {sessionUser.branch && (
                          <span className="truncate text-xs font-semibold">
                            Sucursal {sessionUser.branch?.value} -{" "}
                            {sessionUser.branch?.label}
                          </span>
                        )}
                        {sessionUser.aisles &&
                          sessionUser.aisles.length > 0 && (
                            <span className="truncate text-xs font-semibold">
                              Pasillos {sessionUser.aisles?.join(", ")}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <LogoutButton className="w-full" />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={"Desarrollado por ExpertOne"}
            className="justify-center border bg-secondary hover:bg-foreground hover:text-background"
            size={"sm"}
          >
            <ExpertOneLogoTiny className="hidden w-7! group-data-[collapsible=icon]:block" />
            <ExpertOneLogo className="w-24! group-data-[collapsible=icon]:hidden" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
