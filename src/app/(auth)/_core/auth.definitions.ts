import {
  IdNameSchema,
  idNameToValueLabelAdapter,
  ValueLabelSchema,
} from "@/app/_shared/main.definitions";
import { getMapObjectValue } from "@/app/_shared/main.lib";
import { z } from "zod";
export const DatabaseSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type DatabaseT = z.infer<typeof DatabaseSchema>;

export const ApiRoleSchema = IdNameSchema.extend({
  name: z.enum(["Almacén", "Producción"]),
});
export type ApiRoleT = z.infer<typeof ApiRoleSchema>;

export const RoleSchema = ValueLabelSchema.extend({
  value: z.enum(["warehouse", "production"]),
});
export type RoleT = z.infer<typeof RoleSchema>;
export const rolesMapAdapter = {
  warehouse: {
    apiValue: "1",
    apiLabel: "Almacén",
    value: "warehouse",
    label: "Almacén",
  },
  production: {
    apiValue: "2",
    apiLabel: "Producción",
    value: "production",
    label: "Producción",
  },
} as const;

export const ApiPermissionSchema = IdNameSchema.extend({
  name: z.enum([
    "Recepciones",
    "Picking",
    "Packing",
    "Recuentos",
    "Consultas",
    "Entradas manuales",
    "Salidas manuales",
    "Reubicaciones",
  ]),
});
export type ApiPermissionT = z.infer<typeof ApiPermissionSchema>;

export const PermissionSchema = ValueLabelSchema.extend({
  value: z.enum([
    "receptions",
    "picking",
    "packing",
    "counts",
    "queries",
    "manual-entries",
    "manual-outputs",
    "relocations",
  ]),
});
export type PermissionT = z.infer<typeof PermissionSchema>;

export const permissionMapAdapter = {
  receptions: {
    apiValue: "1",
    apiLabel: "Recepciones",
    value: "receptions",
    label: "Recepciones",
  },
  picking: {
    apiValue: "2",
    apiLabel: "Picking",
    value: "picking",
    label: "Picking",
  },
  packing: {
    apiValue: "3",
    apiLabel: "Packing",
    value: "packing",
    label: "Packing",
  },
  counts: {
    apiValue: "4",
    apiLabel: "Recuentos",
    value: "counts",
    label: "Recuentos",
  },
  queries: {
    apiValue: "5",
    apiLabel: "Consultas",
    value: "queries",
    label: "Consultas",
  },
  "manual-entries": {
    apiValue: "6",
    apiLabel: "Entradas manuales",
    value: "manual-entries",
    label: "Entradas manuales",
  },
  "manual-outputs": {
    apiValue: "7",
    apiLabel: "Salidas manuales",
    value: "manual-outputs",
    label: "Salidas manuales",
  },
  relocations: {
    apiValue: "8",
    apiLabel: "Reubicaciones",
    value: "relocations",
    label: "Reubicaciones",
  },
} as const;
export const ApiUserSchema = z.object({
  code: z.string(),
  username: z.string(),
  name: z.string().optional(),
});
export type ApiUserT = z.infer<typeof ApiUserSchema>;

export const ApiSessionUserSchema = ApiUserSchema.extend({
  database: z.string(),
  token: z.string(),
  branch: IdNameSchema.optional(),
  aisles: z.array(z.string()).optional(),
  roles: z.array(ApiRoleSchema),
  permissions: z.array(ApiPermissionSchema),
});
export type ApiSessionUserT = z.infer<typeof ApiSessionUserSchema>;

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string().optional(),
});
export type UserT = z.infer<typeof UserSchema>;

export const SessionUserSchema = UserSchema.extend({
  database: z.string(),
  token: z.string(),
  branch: ValueLabelSchema.optional(),
  aisles: z.array(z.string()).optional(),
  roles: z.array(RoleSchema).optional(),
  permissions: z.array(PermissionSchema).optional(),
});
export type SessionUserT = z.infer<typeof SessionUserSchema>;

export const userAdapter = (user: ApiUserT): UserT => {
  return {
    id: user.code,
    username: user.username,
    name: user.name,
  };
};

export const sessionUserAdapter = (user: ApiSessionUserT): SessionUserT => {
  return {
    ...userAdapter(user),
    database: user.database,
    aisles: user.aisles,
    branch: user.branch && idNameToValueLabelAdapter(user.branch),
    token: user.token,
    roles:
      user.roles?.map((r) =>
        getMapObjectValue(rolesMapAdapter, "apiLabel", r.name, { ignoreCase: true })
      ) ?? [],
    permissions:
      user.permissions?.map((p) =>
        getMapObjectValue(permissionMapAdapter, "apiLabel", p.name, {
          ignoreCase: true,
        })
      ) ?? [],
  };
};
