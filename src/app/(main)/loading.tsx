import Container from "@/components/_layout/Container";
import Spinner from "@/components/Spinner";

export default function Loading() {
  console.log("Main Loading");
  return (
    <Container className="w-full h-full justify-center items-center">
      <Spinner className="size-40 text-foreground/80" />
    </Container>
  );
}
