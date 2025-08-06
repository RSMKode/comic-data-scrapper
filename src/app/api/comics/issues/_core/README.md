# Comic Scraping con TypeScript y Cheerio

Este módulo proporciona funciones para hacer scraping de datos de comics desde diferentes bases de datos (Marvel Comics y DC Comics de Fandom).

## Características

- ✅ **TypeScript completo**: Tipado fuerte y seguridad de tipos
- ✅ **Soporte para múltiples bases de datos**: Marvel Comics, DC Comics
- ✅ **Manejo de errores robusto**: Validación de URLs y datos
- ✅ **Transformación de datos**: Convierte datos scrapeados al formato del schema
- ✅ **Optimizado para rendimiento**: Extracción eficiente de datos

## Uso Básico

```typescript
import { scrapeComic, transformScrapedDataToComicIssue } from './comic-issues.use-cases';

// Scrapear un comic de Marvel
const marvelURL = "https://marvel.fandom.com/wiki/Amazing_Spider-Man_Vol_1_1";
const scrapedData = await scrapeComic(marvelURL, new Date());

// Transformar al formato del schema
const transformedData = transformScrapedDataToComicIssue(scrapedData);
```

## Funciones Principales

### `scrapeComic(comicURL: string, date: Date): Promise<ScrapeResult>`

Función principal que extrae datos de un comic desde su URL.

**Parámetros:**
- `comicURL`: URL del comic en Fandom (Marvel o DC)
- `date`: Fecha de lectura

**Retorna:** Objeto `ScrapeResult` con todos los datos extraídos

**Ejemplo:**
```typescript
const result = await scrapeComic(
  "https://marvel.fandom.com/wiki/Amazing_Spider-Man_Vol_1_1", 
  new Date()
);
```

### `transformScrapedDataToComicIssue(scrapedData: ScrapeResult): Partial<ComicIssueDataT>`

Transforma los datos scrapeados al formato del schema definido.

**Parámetros:**
- `scrapedData`: Resultado del scraping

**Retorna:** Objeto compatible con `ComicIssueDataT`

## Datos Extraídos

La función extrae los siguientes datos:

- **Información básica:**
  - Título del comic
  - Colección/Serie
  - URL de imagen de portada
  - Fecha de publicación
  - Fecha de portada

- **Navegación:**
  - Issues anteriores
  - Issues siguientes

- **Equipo creativo:**
  - Escritores (Writers)
  - Dibujantes (Pencilers)
  - Entintadores (Inkers)
  - Coloristas (Colorists)
  - Letristas (Letterers)
  - Editores (Editors)

- **Eventos y arcos:**
  - Events/Arcs narrativos

## Bases de Datos Soportadas

### Marvel Comics
- URL base: `marvel.fandom.com`
- Selectores específicos para la estructura de Marvel Fandom

### DC Comics
- URL base: `dc.fandom.com`
- Selectores específicos para la estructura de DC Fandom

## Ejemplo Completo

```typescript
import { testComicScraping } from './comic-issues.example';

// Test con diferentes URLs
await testComicScraping("https://marvel.fandom.com/wiki/Amazing_Spider-Man_Vol_1_1");
await testComicScraping("https://dc.fandom.com/wiki/Batman_Vol_1_1");
```

## Manejo de Errores

La función incluye manejo robusto de errores:

- Validación de URLs
- Verificación de que la base de datos es soportada
- Manejo de errores de red
- Validación de elementos requeridos (como el título)

```typescript
try {
  const result = await scrapeComic(url, new Date());
  // Procesar resultado
} catch (error) {
  if (error.message.includes("Database not found")) {
    // URL no soportada
  } else if (error.message.includes("Title not found")) {
    // Página no es un comic válido
  } else {
    // Otro error
  }
}
```

## Configuración

Las bases de datos están configuradas en `comic-databases.config.ts`:

```typescript
export const COMIC_DATABASES = {
  marvelComics: {
    name: 'Marvel Comics',
    url: 'marvel.fandom.com',
    type: "Wiki"
  },
  dcComics: {
    name: 'DC Comics',
    url: 'dc.fandom.com',
    type: "Wiki"
  },
  // ... más bases de datos
};
```

## Mejoras vs Versión Original

1. **TypeScript completo**: Tipado fuerte en toda la aplicación
2. **Mejor manejo de errores**: Validaciones más robustas
3. **Código más limpio**: Eliminación de código duplicado
4. **Mejor performance**: Optimizaciones en las consultas DOM
5. **Estructura modular**: Separación clara de responsabilidades
6. **Transformación de datos**: Conversión automática al formato del schema

## Dependencias

- `cheerio`: Para parsing de HTML
- `zod`: Para validación de schemas (en definitions)

## Instalación

```bash
pnpm add cheerio
```
