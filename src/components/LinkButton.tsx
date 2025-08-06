import { cn } from '@/lib/components.lib';
import Link, { LinkProps } from 'next/link';
import { HTMLAttributeAnchorTarget } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface Props extends LinkProps {
  tooltip?: string;
  target?: HTMLAttributeAnchorTarget;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export default function LinkButton({
  tooltip,
  children,
  className,
  'aria-label': ariaLabel,
  ...rest
}: Props) {
  const TempLink = (
    <Link
      aria-label={ariaLabel || tooltip}
      {...rest}
      className={cn(
        'bg-background inline-flex gap-1 justify-center items-center px-2 py-1 text-foreground hover:text-accent-primary hover:bg-foreground rounded transition cursor-pointer disabled:opacity-20 disabled:cursor-progress active:transition active:scale-95 border-2 transparent hover:border-accent-primary/70 hover:shadow-md w-fit',
        className
      )}>
      {children}
    </Link>
  );

  return tooltip ? (
      <Tooltip>
        <TooltipTrigger asChild>{TempLink}</TooltipTrigger>
        <TooltipContent className="z-10">{tooltip}</TooltipContent>
      </Tooltip>
  ) : (
    TempLink
  );
}
