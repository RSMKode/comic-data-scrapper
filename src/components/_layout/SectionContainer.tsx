import { cn } from "@/lib/components.lib";

type AppSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AppSection({ children, className }: AppSectionProps) {
  return (
    <section className={cn("flex flex-col gap-3 items-center w-full")}>
      {children}
    </section>
  );
}
