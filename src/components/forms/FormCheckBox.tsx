import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";

type Props = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  defaultChecked?: boolean;
  description?: string;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function FormCheckBox({
  form,
  name,
  label,
  description,
  defaultChecked,
  placeholder,
  autoFocus,
  disabled,
  className,
  onChange,
}: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start gap-x-3 gap-y-0 p-2">
          <FormControl>
            <Checkbox
              {...field}
              checked={field.value}
              onCheckedChange={field.onChange}
              defaultChecked={defaultChecked}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
}
