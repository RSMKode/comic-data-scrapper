import { ComponentProps } from "react";
import Container from "../_layout/Container";
import { cn } from "@/lib/components.lib";
import { SHIMMER_CLASS } from "@/config/themes.config";

type MenuSkeletonProps = ComponentProps<typeof Container> & {
  rows: number;
};

/**
 * Función para generar un ancho aleatorio entre un rango
 */
const getRandomWidth = () => {
  const min = 10;
  const max = 15;
  return `${Math.floor(Math.random() * (max - min + 1) + min)}rem`;
};

export default function MenuSkeleton({
  rows,
  className,
  ...props
}: MenuSkeletonProps) {
  const array = Array.from({ length: rows });

  return (
    <Container
      className={cn(
        "relative w-full items-start overflow-clip border-foreground/50",
        className,
        SHIMMER_CLASS
      )}
      {...props}
    >
      {array.map((item, index) => (
        <div
          key={index}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-background p-2"
        >
          <span className="size-7 rounded bg-secondary" />
          <span
            className="h-5 rounded-lg bg-secondary"
            style={{ width: getRandomWidth() }}
          />
        </div>
      ))}
    </Container>
  );
}
