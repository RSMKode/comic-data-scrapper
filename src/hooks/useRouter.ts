import { useRouter as useTopLoaderRouter } from "nextjs-toploader/app";

export const useRouter = () => {
  const router = useTopLoaderRouter();
  return router;
};
