"use client";
import { FormInput } from "@/components/forms/FormInput";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TbUser, TbUserCheck } from "react-icons/tb";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { DatabaseT } from "../../_core/auth.definitions";
import { CiLock } from "react-icons/ci";
import { FormComboBox } from "@/components/forms/FormComboBox";
import { SubmitButton } from "@/components/forms/SubmitButton";
import ErrorLabel from "@/components/ErrorLabel";
import { loginAction } from "../../actions";
import { Skeleton } from "@/components/ui/skeleton";

export const LogInFormSchema = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es requerido",
      message: "El nombre de usuario debe ser una cadena de texto",
    })
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "El nombre de usuario no puede tener más de 255 caracteres",
    })
    .trim(),
  password: z
    .string({
      required_error: "La contraseña es requerida",
      message: "La contraseña debe ser una cadena de texto",
    })
    .min(4, {
      message: "La contraseña debe tener al menos 4 caracteres",
    })
    .max(255, {
      message: "La contraseña no puede tener más de 255 caracteres",
    })
    .trim(),
  database: z
    .string({
      required_error: "La base de datos es requerida",
      message: "La base de datos debe ser una cadena de texto",
    })
    .min(1, { message: "Debes seleccionar una base de datos" }),
});
export type LogInFormT = z.infer<typeof LogInFormSchema>;

type LogInFormProps = {
  databases: DatabaseT[];
};
export default function LogInForm({ databases }: LogInFormProps) {
  const databaseOptions = databases.map((database) => ({
    label: database.name,
    value: database.id,
  }));

  const form = useForm<LogInFormT>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: {
      username: "",
      password: "",
      database: databaseOptions[0].value,
    },
  });

  const { isPending, execute, data, error, isError } = useServerAction(
    loginAction,
    {
      onSuccess: () => {
        toast.success(data);
      },
      onError: ({ err }) => {
        toast.error(err.message);
      },
    }
  );

  const onSubmit = (values: LogInFormT) => {
    execute(values);
    toast.dismiss();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <FormInput
            leftIcon={<TbUser className="size-4 sm:size-5" />}
            formControl={form.control}
            label="Usuario"
            name="username"
            placeholder="Usuario de SAP"
          />
          <FormInput
            leftIcon={<CiLock className="font-bol size-4 sm:size-5" />}
            formControl={form.control}
            label="Contraseña"
            name="password"
            type="password"
            placeholder="**********"
          />
          <FormComboBox
            form={form}
            label="Base de datos"
            name="database"
            options={databaseOptions}
            // defaultSelected={databaseOptions[0].value}
          />
          <SubmitButton className="w-full" isPending={isPending}>
            Iniciar sesión
            <TbUserCheck className="size-4 sm:size-5" />
          </SubmitButton>
        </form>
        {isError && <ErrorLabel>{error?.message}</ErrorLabel>}
      </Form>
    </>
  );
}

export async function LogInFormSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
