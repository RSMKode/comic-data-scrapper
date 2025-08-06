import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/components.lib";
import { TbSearch } from "react-icons/tb";

export type StockSearchButtonProps = ButtonProps & {
  label?: string;
};
export const StockSearchButton = ({
  label = "Buscar stock",
  tooltip = "Ver resultados de stock",
  className,
  variant = "notice_fill",
  size = "icon",
  children,
  type = "button",
  ...props
}: StockSearchButtonProps) => {
  return (
    <Button
      type={type}
      className={cn("", className)}
      aria-label={props["aria-label"] || tooltip}
      tooltip={tooltip}
      variant={variant}
      size={size}
      {...props}
    >
      <span className="sr-only">{label}</span>
      {children ? children : <TbSearch className="size-4" />}
    </Button>
  );
};
