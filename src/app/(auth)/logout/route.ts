import { ROUTES } from "@/config/routes.config";
import { redirect } from "next/navigation";
import { logoutAction } from "../actions";

export async function GET() {
  try {
    await logoutAction().then(() => {
      console.log("Se ha cerrado sesión correctamente");
    });
  } catch (error) {
    console.error(error);
  } finally {
    redirect(ROUTES.login.self.path);
  }
}
