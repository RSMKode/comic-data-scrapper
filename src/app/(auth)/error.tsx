"use client";
import Container from "@/components/_layout/Container";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/hooks/useRouter";
import { IoReload } from "react-icons/io5";
import { usePathname } from "next/navigation";

// Error components must be Client Components

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

  return (
    <Container className="w-full">
      <BackButton className="w-full" />
      <h1 className="text-2xl font-semibold">Ha habido un error</h1>
      <section className="text-danger font-semibold break-words w-full flex flex-col gap-2 items-center text-center">
        <p className="w-full">
          {error.message || "Ha ocurrido un error inesperado"}
        </p>
      </section>
      <div className="flex flex-col gap-2 w-full">
        <Button onClick={reset} className="w-full gap-2">
          Volver a intentarlo
          <IoReload className="size-5" />
        </Button>
      </div>
    </Container>
  );
}
