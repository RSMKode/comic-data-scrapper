import { PermissionT, RoleT } from "@/app/(auth)/_core/auth.definitions";
import { IconType } from "react-icons";
import { BsBoxes } from "react-icons/bs";
import { IoMdLogIn } from "react-icons/io";
import { LiaPalletSolid } from "react-icons/lia";
import { LuPackageCheck, LuPackagePlus, LuPackageSearch } from "react-icons/lu";
import { MdHome } from "react-icons/md";
import {
  TbArrowsShuffle,
  TbBox,
  TbBuildingWarehouse,
  TbExchange,
  TbPackage,
  TbPackageExport,
  TbPackageImport,
  TbTruck,
  TbTruckDelivery,
  TbUser,
} from "react-icons/tb";

export const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Inicio",
  login: "Inició de sesión",
  profile: "Perfil",
  sga: "SGA",
  inventory: "Inventario",
  stock: "Stock",
  reception: "Recepción",
  entry: "Entrada",
  pallets: "Palets",
  palletId: "Detalle de palet",
  boxes: "Cajas",
  boxId: "Detalle de caja",
  relocation: "Reubicación",
  picking: "Picking",
} as const;

export type OldRouteT = {
  name: string;
  path: string;
  fullName?: string;
  icon?: IconType;
  type:
    | "home"
    | "login"
    | "profile"
    | "group"
    | "section"
    | "sub-section"
    | "page";
  subRoutes?: Record<string, OldRouteT>;
};

export type RouteSelfT = {
  path: string;
  name: string;
  fullName?: string;
  icon?: IconType;
  type: string;
  permissions?:
    | (PermissionT["value"] | RoleT["value"])[]
    | ReadonlyArray<PermissionT["value"] | RoleT["value"]>;
  getLabel?: (...args: unknown[]) => string;
};

export type RouteT = {
  self: RouteSelfT;
  [key: string]: RouteSelfT | RouteT;
};
export type RoutesT = Record<string, RouteT>;

const updatePaths = <T extends RoutesT>(
  routes: T,
  parentPath: string = "",
  visited: Set<RoutesT> = new Set()
): T => {
  if (visited.has(routes)) {
    return routes;
  }
  visited.add(routes);

  const result: RoutesT = {};

  for (const key in routes) {
    const route = routes[key];
    if (route.self) {
      route.self.path = parentPath + route.self.path;
    }
    result[key] = {
      ...route,
      ...updatePaths(
        route as RoutesT,
        route.self ? route.self.path : parentPath,
        visited
      ),
    };
  }

  return result as T;
};

export const ROUTES = {
  home: {
    self: {
      name: "Inicio",
      fullName: "LogOne - Inicio",
      path: "/dashboard",
      type: "home",
      icon: MdHome,
    },
  },
  login: {
    self: {
      name: "Inicio de sesión",
      fullName: "Inicio de sesión",
      path: "/login",
      type: "login",
      icon: IoMdLogIn,
    },
  },
  logout: {
    self: {
      name: "Cerrar sesión",
      path: "/logout",
      type: "logout",
    },
  },
  profile: {
    self: {
      name: "Perfil",
      fullName: "Perfil de usuario",
      path: "/profile",
      icon: TbUser,
      type: "profile",
    },
  },
  sga: {
    self: {
      name: "SGA",
      fullName: "Gestión de Almacén",
      path: "/sga",
      icon: TbBuildingWarehouse,
      type: "group",
    },
    inventory: {
      self: {
        path: "/inventory",
        fullName: "Control de Inventario",
        name: "Inventario",
        icon: LuPackageCheck,
        type: "section",
      },
      stock: {
        self: {
          path: "/stock",
          fullName: "Consulta de Stock",
          name: "Stock",
          icon: LuPackageSearch,
          type: "sub-section",
        },
      },
    },
    reception: {
      self: {
        name: "Recepción",
        fullName: "Recepción",
        path: "/reception",
        icon: TbPackageImport,
        type: "section",
      },
      entry: {
        self: {
          name: "Entrada",
          fullName: "Entrada de Mercancías",
          path: "/entry",
          icon: TbTruckDelivery,
          type: "sub-section",
        },
      },
      pallets: {
        self: {
          name: "Palets",
          fullName: "Palets",
          path: "/pallets",
          icon: LiaPalletSolid,
          type: "sub-section",
        },
        palletId: {
          self: {
            name: "Detalle de Palet",
            fullName: "Detalle de Palet",
            path: "/:palletId",
            icon: TbPackage,
            type: "page",
          },
          boxes: {
            self: {
              name: "Cajas",
              fullName: "Cajas del Palet",
              path: "/boxes",
              icon: BsBoxes,
              type: "page",
            },
            boxId: {
              self: {
                name: "Detalle de caja",
                fullName: "Detalle de Caja",
                path: "/:boxId",
                icon: TbBox,
                type: "page",
              },
            },
          },
        },
      },
    },
    relocation: {
      self: {
        path: "/relocation",
        name: "Reubicación",
        fullName: "Reubicación de Material",
        icon: TbExchange,
        type: "section",
      },
      direct: {
        self: {
          path: "/direct",
          name: "Directa",
          fullName: "Directa",
          icon: TbExchange,
          type: "sub-section",
        },
        checkItem: {
          self: {
            path: "/check",
            name: "Comprobar",
            type: "page",
          },
        },
        prepareItem: {
          self: {
            path: "/prepare",
            name: "Preparar",
            type: "page",
          },
        },
      },
    },
    expedition: {
      self: {
        path: "/expedition",
        name: "Expedición",
        fullName: "Expedición de Material",
        icon: TbPackageExport,
        type: "section",
      },
      picking: {
        self: {
          path: "/picking",
          name: "Picking",
          fullName: "Picking",
          icon: LuPackagePlus,
          type: "sub-section",
        },
        cart: {
          self: {
            path: "/cart",
            name: "Carro",
            fullName: "Listado de Carros",
            icon: TbTruck,
            type: "page",
          },
          cartId: {
            self: {
              path: "/:cartId",
              name: "Detalle Carro",
              fullName: "Detalle del Carro de Picking",
              type: "page",
            },
            relocate: {
              self: {
                path: "/relocate",
                name: "Reubicación",
                fullName: "Reubicación de artículos",
                icon: TbArrowsShuffle,
                type: "page",
              },
              itemId: {
                self: {
                  path: "/:itemId",
                  name: "Reubicar",
                  fullName: "Reubicar artículo",
                  type: "page",
                },
              },
            },
          },
        },
      },
    },
  },
} as const satisfies RoutesT;
export type RoutesDefT = typeof ROUTES;

//? Actualiza los paths de las rutas recursivamente para que tengan el path completo.
updatePaths(ROUTES);
export const EXCLUDED_ROUTES: RouteT[] = [] as const;
