import { NextRequest, NextResponse } from "next/server";
import { checkTokenUseCase } from "./app/(auth)/_core/auth.use-case";
import { IS_DEV } from "./config/env.config";
import { EXCLUDED_ROUTES, ROUTES } from "./config/routes.config";
import { getSessionUser } from "./app/(auth)/actions";

const featureFlagRoutes = {
  "/feature-flag": true,
};
const devProtectedRoutes: string[] = [];
const protectedRoutes = ["/dashboard", "/sga", "production"];

export default async function middleware(request: NextRequest) {
  //comprueba que la ruta es protegida
  const redirectResponse = await verifyAccessAndRedirect(request);
  if (redirectResponse) {
    return redirectResponse;
  }
  const response = NextResponse.next();
  return response;
}

//Routes middleware should *not* run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

const checkFeatureFlagRoute = (currentPath: string) => {
  const isFeatureFlagRoute = Object.keys(featureFlagRoutes).some((flag) =>
    currentPath.includes(flag)
  );
  return isFeatureFlagRoute && !IS_DEV;
};

const checkDevProtectedRoute = (currentPath: string) => {
  const isDevRoute =
    devProtectedRoutes.some((route) => currentPath.includes(route)) ||
    EXCLUDED_ROUTES.some((route) => currentPath.includes(route.self.path));
  const isDevProtectedRoute = isDevRoute && !IS_DEV;
  return isDevProtectedRoute;
};

const checkProtectedRoute = (currentPath: string) => {
  const isProtectedRoute = protectedRoutes.some((route) => {
    if (route === "/") return true;
    return currentPath.includes(route);
  });
  return isProtectedRoute;
};

const verifyAccessAndRedirect = async (request: NextRequest) => {
  //1. Check if route is protected
  const currentPath = request.nextUrl.pathname;

  const isDevProtectedRoute = checkDevProtectedRoute(currentPath);
  const isFeatureFlagRoute = checkFeatureFlagRoute(currentPath);
  if (isDevProtectedRoute || isFeatureFlagRoute)
    return NextResponse.redirect(new URL("/", request.nextUrl));

  const isProtectedRoute = checkProtectedRoute(currentPath);

  if (isProtectedRoute) {
    console.log(
      "Protected route ---------------------------------------------------------------------------------------------"
    );
    //2. Check for valid session
    const sessionUser = await getSessionUser();

    //3. Redirect unauthed users
    if (!sessionUser.token)
      return NextResponse.redirect(
        new URL(ROUTES.login.self.path, request.nextUrl)
      );

    let checkedToken;
    try {
      checkedToken = await checkTokenUseCase(sessionUser);
    } catch (error) {
      console.error(error);
    }

    if (!checkedToken) {
      console.log("Token expired");
      return NextResponse.redirect(
        new URL(ROUTES.logout.self.path, request.nextUrl)
      );
    }
  }
};

const logRequest = (request: NextRequest) => {
  console.log(
    `Recibido ${request.method} en ${
      request.nextUrl.pathname
    } a las ${new Date().toLocaleTimeString("es")}`
  );
};

const checkFeatureFlag = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const currentPath = url.pathname;

  const isFeatureFlag = Object.keys(featureFlagRoutes).some((flag) => {
    return currentPath.includes(flag);
  });

  if (isFeatureFlag) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
};
