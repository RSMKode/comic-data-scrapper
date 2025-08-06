import AppContainer from "@/components/_layout/AppContainer";
import { APP_MAX_WIDTH } from "@/config/themes.config";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppContainer
      className={`justify-center items-center p-2 ${APP_MAX_WIDTH}`}
    >
      {children}
    </AppContainer>
  );
}
