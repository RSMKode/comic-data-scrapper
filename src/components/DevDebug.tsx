import { TbInfoCircle } from "react-icons/tb";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { IS_DEV } from "@/config/env.config";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { cn } from "@/lib/components.lib";
import { DialogTitle } from "@radix-ui/react-dialog";

type DevDebugProps = React.ComponentProps<"div"> & {
  data: any;
  type?: "dialog" | "collapsible";
  className?: string;
};
export default function DevDebug({
  data,
  type = "collapsible",
  className,
  ...props
}: DevDebugProps) {
  const TempButton = (
    <Button
      variant={"danger_fill"}
      className={cn("border-rose-600 bg-rose-900 hover:bg-rose-700", className)}
    >
      <span>DEV INFO</span>
      <TbInfoCircle className="size-4" />
    </Button>
  );

  const TempDebug =
    type === "dialog" ? (
      <Dialog>
        <DialogTrigger className="text-danger" asChild>
          {TempButton}
        </DialogTrigger>
        <DialogContent className="h-[90dvh] w-[90dvh] overflow-auto">
          <DialogTitle className="sr-only">DEV DEBUG</DialogTitle>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </DialogContent>
      </Dialog>
    ) : (
      <Collapsible>
        <CollapsibleTrigger className="text-danger" asChild>
          {TempButton}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </CollapsibleContent>
      </Collapsible>
    );

  return IS_DEV ? TempDebug : null;
}
