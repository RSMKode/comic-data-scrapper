import NextTopLoader from "nextjs-toploader"

export type TopLoaderProps = {
  className?: string;
};

// mostrar una barra de progreso visual (como la de YouTube) durante los cambios de página

export default function TopLoader({ className }: TopLoaderProps) {
  return (
    <NextTopLoader
      color={"var(--accent-primary)"}
      // shadow="0 0 10px var(--accent-primary-foreground),0 0 15px var(--accent-primary-foreground)"
      shadow={false}
      initialPosition={0.08}
      height={3}
      easing="ease"
      speed={200}
      crawl={true}
      crawlSpeed={200}
      showSpinner={true}
      template='<div class="bar" role="bar"><div class="peg"></div></div> 
    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
      zIndex={1600}
      showAtBottom={true}
    />
  );
}
