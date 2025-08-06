"use client"; // Error components must be Client Components

import Container from "@/components/_layout/Container";
import { BackButton } from "@/components/BackButton";
import LinkButton from "@/components/LinkButton";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes.config";
import { useRouter } from "@/hooks/useRouter";
import { usePathname } from "next/navigation";
import { IoReload } from "react-icons/io5";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  error && console.error(error);

  const homeLink = ROUTES.home.self;

  // const sectionLink = flattenRoutes(ROUTES).find(link => pathname.startsWith(link.path));

  const link = homeLink!.path;
  const text = homeLink!.name;
  const Icon = homeLink!.icon!;

  return (
    <Container className="w-full">
      <BackButton className="w-full">Volver</BackButton>
      <h1 className="text-2xl font-semibold">Ha habido un error</h1>
      <section className="text-danger font-semibold break-words w-full flex flex-col gap-2 items-center text-center">
        <p className="w-full">
          {error.message || "Ha ocurrido un error inesperado"}
        </p>
      </section>
      <div className="flex flex-col gap-2 w-ful">
        <Button onClick={reset} className="w-full gap-2">
          Volver a intentarlo
          <IoReload className="size-5" />
        </Button>
        <LinkButton href={link} className="w-full gap-2">
          Volver a {text}
          <Icon className="size-5" />
        </LinkButton>
      </div>
    </Container>
  );
}
