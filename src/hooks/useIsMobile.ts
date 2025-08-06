import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Custom hook que detecta si el ancho de pantalla actual corresponde a un dispositivo móvil.
 *
 * Escucha cambios en el tamaño de la ventana para actualizar el valor automáticamente.
 * 
 * @returns {boolean} true si el ancho de pantalla es menor al breakpoint móvil (768px), false en caso contrario.
 */

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
