import { COMIC_DATABASES } from '@/app/api/comics/issues/_core/comic-databases.config';
import { ComicIssueT } from '@/app/api/comics/issues/_core/comic-issues.definitions';
import { generateAuthorId } from '@/app/api/comics/issues/_core/comic-issues.lib';
import { MarvelComicsFandomScrapedComicIssueDataT } from './marvel.fandom.comic-issues.definitions';

// Función auxiliar para convertir el resultado del scraping al formato de tu schema
export function marvelComicsFandomScrapedDataToComicIssueAdapter(
  scrapedData: MarvelComicsFandomScrapedComicIssueDataT,
  options?: {}
): ComicIssueT {
  const database = COMIC_DATABASES.marvelComicsFandom;
  const publisher = scrapedData.publisher;

  const transformed: Partial<ComicIssueT> = {
    title: scrapedData.title || '',
    collection: {
      id: scrapedData.title,
      name: scrapedData.collection || '',
      publisher: publisher,
    },
    images: scrapedData.imageURL ? [scrapedData.imageURL] : [],
  };

  // Convertir fechas
  if (scrapedData.releaseDate) {
    try {
      transformed.releaseDate = new Date(scrapedData.releaseDate);
    } catch (error) {
      console.warn(`Could not parse release date: ${scrapedData.releaseDate}`);
    }
  }

  if (scrapedData.coverDate) {
    try {
      transformed.coverDate = new Date(scrapedData.coverDate);
    } catch (error) {
      console.warn(`Could not parse cover date: ${scrapedData.coverDate}`);
    }
  }

  // Convertir URLs de issues anteriores y siguientes
  if (scrapedData.previousIssues && scrapedData.previousIssues.length > 0) {
    transformed.previousIssues = scrapedData.previousIssues.map(issue => ({
      ...issue,
      href: issue.href.startsWith('http')
        ? issue.href
        : `https://${scrapedData.database.domain}${issue.href}`,
    }));
  }

  if (scrapedData.nextIssues && scrapedData.nextIssues.length > 0) {
    transformed.nextIssues = scrapedData.nextIssues.map(issue => ({
      ...issue,
      href: issue.href.startsWith('http')
        ? issue.href
        : `https://${scrapedData.database.domain}${issue.href}`,
    }));
  }

  // Convertir autores (esto requiere más lógica para mapear roles)
  const authors = [];

  if (scrapedData.writers) {
    authors.push(
      ...scrapedData.writers.map(name => ({
        id: generateAuthorId(name),
        name,
        roles: ['writer' as const],
      }))
    );
  }

  if (scrapedData.pencilers) {
    authors.push(
      ...scrapedData.pencilers.map(name => ({
        id: generateAuthorId(name),
        name,
        roles: ['penciller' as const],
      }))
    );
  }

  if (scrapedData.inkers) {
    authors.push(
      ...scrapedData.inkers.map(name => ({
        id: generateAuthorId(name),
        name,
        roles: ['inker' as const],
      }))
    );
  }

  if (scrapedData.colorists) {
    authors.push(
      ...scrapedData.colorists.map(name => ({
        id: generateAuthorId(name),
        name,
        roles: ['colorist' as const],
      }))
    );
  }

  if (scrapedData.letterers) {
    authors.push(
      ...scrapedData.letterers.map(name => ({
        id: generateAuthorId(name),
        name,
        roles: ['letterer' as const],
      }))
    );
  }

  if (scrapedData.editors) {
    authors.push(
      ...scrapedData.editors.map(name => ({
        id: generateAuthorId(name),
        name,
        roles: ['editor' as const],
      }))
    );
  }

  if (scrapedData.editorsInChief) {
    authors.push(
      ...scrapedData.editorsInChief.map(name => ({
        id: generateAuthorId(name),
        name,
        roles: ['editorInChief' as const],
      }))
    );
  }

  transformed.authors = authors;

  return transformed as ComicIssueT;
}
