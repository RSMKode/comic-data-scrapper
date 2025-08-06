import { ROUTES, RouteSelfT } from "@/config/routes.config";
import { flattenRoutes } from "./routes.lib";

export const getPathnameData = (pathname: string) => {
  const flatRoutes = flattenRoutes(ROUTES);

  const segments = pathname.split("/");
  console.log({ segments });
  const routes: RouteSelfT[] = [];

  segments.map((segment, index) => {
    if (segment === "") {
      return;
    }
    const routeData = flatRoutes.find((route) => route.path.endsWith(segment));
    if (routeData) {
      routes.push(routeData);
    }
  });
  const parsedPathname = "/" + routes.map((route) => route.name).join("/");

  return { parsedPathname, routes };
};
