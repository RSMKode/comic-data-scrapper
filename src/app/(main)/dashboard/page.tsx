import Container from "@/components/_layout/Container";
import AppSection from "@/components/_layout/SectionContainer";
import DevDebug from "@/components/DevDebug";
import { Button } from "@/components/ui/button";
import { BsArrowReturnRight } from "react-icons/bs";
import { ROUTES } from "@/config/routes.config";
import { filterRoutesByPermissions, flattenRoutes } from "@/lib/routes.lib";
import Link from "next/link";
import { getSession } from "@/app/(auth)/actions";

export default async function DashboardPage() {
  const sessionUser = await getSession();

  const filteredRoutes = filterRoutesByPermissions(
    ROUTES,
    sessionUser.permissions,
    sessionUser.roles
  );

  const dashboardLinks = flattenRoutes(filteredRoutes);

  return (
    <>
      {/* <DevDebug data={sessionUser} /> */}
      <AppSection>
        <Container className="w-full items-center gap-2">
          {dashboardLinks.map(
            ({ name, fullName, path, icon: Icon, type }, index) => {
              if (type === "group")
                return (
                  <h3
                    className="flex gap-2 self-start text-xl font-semibold text-foreground/80"
                    key={index}
                  >
                    <Link href={path} className="flex gap-2">
                      {Icon && <Icon className="size-6" />}
                      {fullName || name}
                    </Link>
                  </h3>
                );
              else if (type === "section")
                return (
                  <Button
                    key={index}
                    className="flex w-full items-center gap-1"
                    asChild
                  >
                    <Link href={path}>
                      {Icon && <Icon className="size-6" />}
                      <span>{fullName || name}</span>
                    </Link>
                  </Button>
                );
              else if (type === "sub-section")
                return (
                  <span
                    className="flex w-full items-center gap-2 pl-2"
                    key={index}
                  >
                    <BsArrowReturnRight className="size-4 sm:size-5" />
                    <Button
                      key={index}
                      className="w-full items-center gap-1 bg-background/80 text-foreground/80"
                      asChild
                    >
                      <Link href={path}>
                        {Icon && <Icon className="size-6" />}
                        <span>{fullName || name}</span>
                      </Link>
                    </Button>
                  </span>
                );
            }
          )}
        </Container>
      </AppSection>
    </>
  );
}
