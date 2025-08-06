import { z } from "zod";

export const IdNameSchema = z.object({
  id: z.string(),
  name: z.string(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  code: z.string().optional(),
  Code: z.string().optional(),
});
export type IdNameT = z.infer<typeof IdNameSchema>;

export const ValueLabelSchema = z.object({
  apiValue: z.string().optional(),
  value: z.string(),
  apiLabel: z.string().optional(),
  label: z.string(),
});
export type ValueLabelT = z.infer<typeof ValueLabelSchema>;

export const idNameToValueLabelAdapter = (
  idName: IdNameT | string
): ValueLabelT => {
  if (typeof idName === "string") {
    return {
      value: idName,
      label: idName,
    };
  }

  return {
    value: idName.id || idName.Id || idName.code || idName.Code || "",
    label:
      idName.name ||
      idName.Name ||
      idName.id ||
      idName.Id ||
      idName.code ||
      idName.Code ||
      "",
  };
};

export const valueLabelToIdNameAdapter = (valueLabel: ValueLabelT): IdNameT => {
  return {
    id: valueLabel.value,
    // code: valueLabel.value,
    name: valueLabel.label,
  };
};
