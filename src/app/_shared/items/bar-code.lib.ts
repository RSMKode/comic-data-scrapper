import {
  BarCodeDataT,
  GS1_APPLICATION_IDENTIFIERS,
  GS1_SEPARATOR,
  gs1ApplicationIdentifierAdapter,
} from "./bar-code.config";

export const extractBarCodeValues = (str: string) => {
  const minBarCodeLenght = 16;

  if (str.length < minBarCodeLenght) {
    const errorMessage = `El código de barras debe tener al menos ${minBarCodeLenght} caracteres`;
    // console.log(errorMessage);
    throw new Error(errorMessage);
  }

  if (
    str.length === minBarCodeLenght &&
    !str.startsWith(GS1_APPLICATION_IDENTIFIERS["00"].ai) &&
    !str.startsWith(GS1_APPLICATION_IDENTIFIERS["01"].ai) &&
    !str.startsWith(GS1_APPLICATION_IDENTIFIERS["02"].ai) && 
    !str.startsWith(GS1_APPLICATION_IDENTIFIERS["03"].ai)
  ) {
    const errorMessage = `El ean 14 debe empezar con el IA ${GS1_APPLICATION_IDENTIFIERS["01"].ai}`;
    // console.log(errorMessage);
    throw new Error(errorMessage);
  }

  const mapData = new Map<string, string>();
  const jsonData: Record<string, string> = {};
  let index = 0;

  while (index < str.length) {
    // Detectar el AI (primeros 2 o 3 caracteres)
    let ai = str.substring(index, index + 2);
    if (
      !GS1_APPLICATION_IDENTIFIERS[
        ai as keyof typeof GS1_APPLICATION_IDENTIFIERS
      ]
    ) {
      ai = str.substring(index, index + 3);
    }

    const aiData =
      GS1_APPLICATION_IDENTIFIERS[
        ai as keyof typeof GS1_APPLICATION_IDENTIFIERS
      ];
    if (!aiData) {
      const errorMessage = `IA no reconocido: ${ai}: ${str.substring(index + ai.length)}`;
      console.debug(errorMessage);
      // throw new Error(errorMessage);
      break;
    }

    index += ai.length;
    let value;

    if (aiData.variableLength) {
      // Si es de longitud variable, buscar el separador
      const nextSeparatorIndex = str.indexOf(GS1_SEPARATOR, index);
      if (nextSeparatorIndex === -1) {
        value = str.substring(index, index + aiData.chars);
        index = str.length;
      } else {
        value = str.substring(index, nextSeparatorIndex);
        index = nextSeparatorIndex + GS1_SEPARATOR.length;
      }
    } else {
      // Si es de longitud fija, tomar los caracteres correspondientes
      value = str.substring(index, index + aiData.chars);
      index += aiData.chars;
    }

    mapData.set(ai, value);
    jsonData[aiData.ai] = value;
  }
  // console.log("mapData", mapData);
  // console.log("jsonData", jsonData);

  return { mapData, jsonData };
};

export const getBarCodeData = (queryString: string): BarCodeDataT => {
  const newBarCode = queryString.replace(/[\n\r\s]/g, "");
  let jsonData: Record<string, string> = {};
  try {
    const data = extractBarCodeValues(newBarCode);
    jsonData = data.jsonData;
  } catch (error) {
    console.log("getBarCodeData Error", error);
  }

  const barCodeData = gs1ApplicationIdentifierAdapter(jsonData, queryString);

  return { ...barCodeData, queryString };
};

const extractBarCodeValuesOld = (str: string) => {
  const regex = /\((\d+)\)([^(]+)/g;
  const mapData = new Map<string, string>();
  const jsonData: Record<string, string> = {};
  let match;

  while ((match = regex.exec(str)) !== null) {
    const key = match[1];
    const value = match[2];
    mapData.set(key, value);
    jsonData[key] = value;
  }

  return { mapData, jsonData };
};
