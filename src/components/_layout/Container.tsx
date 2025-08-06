import { cn } from '@/lib/components.lib';

interface ContainerProps {
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function Container({ disabled, className, children }: ContainerProps) {
  return (
    <section
      className={cn(
        'flex flex-col gap-4 p-4 items-center rounded-lg bg-secondary border w-fit shadow-md',
        className,
        disabled && 'pointer-events-none opacity-50'
      )}>
      {children}
    </section>
  );
}
