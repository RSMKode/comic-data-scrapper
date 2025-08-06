import { getAllowedOrigins, validateEnv } from "@/config/build-time/build-time";
import { getAppRedirects } from "@/config/build-time/redirect";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import packageJSON from "package.json" assert { type: "json" };

//Valida variables de entorno y obtiene los orígenes permitidos
const env = validateEnv();
const allowedOrigins = getAllowedOrigins(env);

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: "standalone",
  redirects: async () => {
    return getAppRedirects();
  },
  publicRuntimeConfig: {
    name: packageJSON.name,
    version: packageJSON.version,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["*", "*:*", ...allowedOrigins],
    },
    mdxRs: true,
  },
  //Configure `pageExtensions` to incluide markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: false,
};

const withMDX = createMDX({
  //Add markdown plugins here, as desired
});
export default withMDX(nextConfig);
