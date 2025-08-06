import MainContainer from "@/components/_layout/MainContainer";
import { APP_MAX_WIDTH } from "@/config/themes.config";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <MainContainer className={`p-2 ${APP_MAX_WIDTH}`}>{children}</MainContainer>
  );
}
