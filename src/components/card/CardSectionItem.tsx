import * as React from "react";
import { cn } from "@/lib/components.lib";
import { LabelValueItem } from "./LabelValueItem";

export type CardSectionItemProps = React.ComponentProps<typeof LabelValueItem>

const CardSectionItem = ({ className, ...props }: CardSectionItemProps) => (
  <LabelValueItem className={cn("", className)} {...props} />
);

export { CardSectionItem };
