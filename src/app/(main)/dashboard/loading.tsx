import Container from "@/components/_layout/Container";
import MenuSkeleton from "@/components/skeletons/MenuSkeleton";
import { SHIMMER_CLASS } from "@/config/themes.config";
import { cn } from "@/lib/components.lib";

export default function Loading() {
  return (
    <Container
      className={cn(
        "relative w-full items-start overflow-hidden border-foreground/50",
        SHIMMER_CLASS
      )}
    >
      <MenuSkeleton rows={8} />
    </Container>
  );
}
