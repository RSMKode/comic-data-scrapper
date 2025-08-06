import { PermissionT, RoleT } from "@/app/(auth)/_core/auth.definitions";
import {
  EXCLUDED_ROUTES,
  RouteSelfT,
  RoutesT,
  RouteT,
} from "@/config/routes.config";

/**
 * Convierte una estructura de rutas anidadas en una lista plana de rutas individuales.
 *
 * @param {RoutesT} routes - Objeto con rutas anidadas
 * @returns {RouteSelfT[]} Lista de todas las rutas (self) sin anidamiento.
 */
export const flattenRoutes = (routes: RoutesT): RouteSelfT[] => {
  return Object.values(routes).flatMap(({ self, ...subRoutes }) => [
    self,
    ...(subRoutes ? flattenRoutes(subRoutes as RoutesT) : []),
  ]);
};

/**
 * Verifica si un usuario tiene permisos o roles para acceder a una ruta específica.
 *
 * @param {RouteT} route - Ruta de validar.
 * @param {PermissionT[]} userPermissions - Lista de permisos del usuario.
 * @param {RoleT[]} [userRoles] - Lista de roles de usuarios.
 * @param {boolean} [checkChildrenPermissions=false] - Si debe comprobar permisos en subrutas también.
 * @returns {boolean | void} `true` si tiene permiso, `false` si no, `void` si la ruta no es válida.
 */
export const checkRoutePermissions = (
  route: RouteT,
  userPermissions: PermissionT[],
  userRoles?: RoleT[],
  checkChildrenPermissions?: boolean
): boolean | void => {
  // console.log("checkPermisson", { userPermissions, userRoles });

  if (!route?.self) return;

  const { self, ...subRoutes } = route;
  // console.log("Checking route permission", self.path, self.permission);

  // Si la ruta no tiene permisos definidos
  if (!self.permissions?.length) {
    if (checkChildrenPermissions) {
      const childrenPermissions = Object.values(subRoutes as RoutesT)
        .flatMap(({ self }) => self.permissions || [])
        .filter(Boolean);
      const uniqueChildrenPermissions = new Set(childrenPermissions);

      if (!uniqueChildrenPermissions.size) return true;

      return [...uniqueChildrenPermissions].some(
        (permission) =>
          userPermissions.some(({ value }) => value === permission) ||
          userRoles?.some(({ value }) => value === permission)
      );
    }
    return true;
  }

  // Verificar permisos de la ruta actual
  return (
    userPermissions.some((permissions) =>
      self.permissions?.includes(permissions.value)
    ) || userRoles?.some((role) => self.permissions?.includes(role.value))
  );
};

/**
 * Filtra un objeto de rutas y devuelve solo aquellas a las que el usuario tiene acceso,
 * excluyendo rutas bloqueadas o sin permisos suficientes.
 *
 * @param {RoutesT} routes - Objeto de rutas completo.
 * @param {PermissionT[]} [userPermissions=[]] - Permisos del usuario.
 * @param {RoleT[]} [userRoles=[]] - Roles del usuario.
 * @param {RouteT[]} [excludedRoutes=EXCLUDED_ROUTES] - Rutas que se deben excluir manualmente.
 * @returns {RoutesT} Objeto con las rutas visibles para ese usuario.
 */
export const filterRoutesByPermissions = (
  routes: RoutesT,
  userPermissions: PermissionT[] = [],
  userRoles: RoleT[] = [],
  excludedRoutes: RouteT[] = EXCLUDED_ROUTES
): RoutesT => {
  // console.log("filterRoutes", { userPermissions, userRoles });

  const filteredRoutes = Object.entries(routes).reduce((acc, [key, route]) => {
    if (
      checkRoutePermissions(route, userPermissions, userRoles, true) &&
      !excludedRoutes.some(
        (excludedRoute) => excludedRoute.self.path === route.self.path
      )
    ) {
      const { self, ...subRoutes } = route;
      const filteredSubRoutes =
        subRoutes && Object.entries(subRoutes).length
          ? filterRoutesByPermissions(
              subRoutes as RoutesT,
              userPermissions,
              userRoles
            )
          : undefined;
      acc[key] = {
        self: route.self,
        ...(filteredSubRoutes as RoutesT),
      };
    }
    return acc;
  }, {} as RoutesT);

  return filteredRoutes;
};
