import { ColorThemeT } from '@/config/themes.config';
import { useLayoutEffect } from 'react';

const DARK_MODE_CLASSNAME = 'dark';

export const applyColorTheme = (colorTheme: ColorThemeT) => {
  const documentClassList = document.documentElement.classList;

  documentClassList.forEach(className => {
    if (className.startsWith('color-theme-')) {
      console.log(className);
      documentClassList.remove(className);
    }
  });
  console.log(colorTheme);
  documentClassList.add(colorTheme as string);
}
  

export const useApplyColorTheme = (
  currentColorTheme?: ColorThemeT
) => {
  useLayoutEffect(() => {
    if (currentColorTheme) {
      applyColorTheme(currentColorTheme);
    }
  }, [currentColorTheme]);
};
