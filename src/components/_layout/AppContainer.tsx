import { cn } from "@/lib/components.lib";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function AppContainer({ className, children }: Props) {
  return (
    <div className={cn("w-full min-h-screen flex flex-col", className)}>
      {children}
    </div>
  );
}
