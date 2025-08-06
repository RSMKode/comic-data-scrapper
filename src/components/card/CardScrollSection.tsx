import * as React from "react";
import { cn } from "@/lib/components.lib";
import { Slot } from "@radix-ui/react-slot";
export interface CardScrollSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  itemDataListLength?: number;
  itemDataList?: {
    props: {
      label: string | number;
      value: string | number;
    }[];
  }[];
}
const CardScrollSection = ({
  className,
  asChild = false,
  children,
  itemDataListLength = 2,
  ...props
}: CardScrollSectionProps) => {
  const Comp = asChild ? Slot : "section";
  return (
    <Comp
      className={cn(
        "flex w-full flex-col gap-2 px-2",
        itemDataListLength &&
          itemDataListLength > 1 &&
          "max-h-40 overflow-auto rounded-lg border bg-background p-2 text-sm shadow-secondary transition duration-300 lg:hover:scale-[1.10]",
        className
      )}
      {...props}
    >
      {/* {itemDataList?.map((item, index) => {
        const itemKey = item.props.map(item => item.value).join('');
        return <CardScrollItem key={itemKey} item={item} />;
      })} */}
      {/* <ScrollArea>
        <div>{children}</div>
      </ScrollArea> */}
      {children}
    </Comp>
  );
};

export { CardScrollSection };
