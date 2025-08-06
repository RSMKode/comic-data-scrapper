import Container from "@/components/_layout/Container";
import MainContainer from "@/components/_layout/MainContainer";
import DeleteCookies from "@/components/DeleteCookies";
import ErrorLabel from "@/components/ErrorLabel";
import { MainLogo } from "@/components/global/MainLogo";
import { ROUTES } from "@/config/routes.config";
import { handleAsync } from "@/lib/error";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getDBUseCase } from "../_core/auth.use-case";
import LogInForm, { LogInFormSkeleton } from "./_components/LogInForm";
import { getSessionUser } from "../actions";

export default async function LoginPage() {
  const sessionUser = await getSessionUser();

  if (sessionUser.token) {
    redirect(ROUTES.home.self.path);
  }

  const [response, error] = await handleAsync(getDBUseCase);
  const databases = response?.databases ?? [];

  return (
    <MainContainer className="p-0">
      <MainLogo
        showIcon={false}
        className="text-accent-primary justify-center [&_svg]:h-32 [&_svg]:w-60"
      />
      <Container className="w-full border-accent-primary">
        {sessionUser.token && (
          <>
            <DeleteCookies cookies={["session"]} />
            <ErrorLabel>Sesión expirada</ErrorLabel>
          </>
        )}
        <Suspense fallback={<LogInFormSkeleton />}>
          <LogInForm databases={databases} />
        </Suspense>
      </Container>
      {error && <ErrorLabel>{error.message}</ErrorLabel>}
    </MainContainer>
  );
}
