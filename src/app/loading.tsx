import Container from "@/components/_layout/Container";
import Spinner from "@/components/Spinner";

export default function Loading() {
  console.log("Root Loading");

  return (
    <Container className="h-full w-full items-center justify-center border-0">
      <Spinner className="size-60 text-foreground/80" />
    </Container>
  );
}
