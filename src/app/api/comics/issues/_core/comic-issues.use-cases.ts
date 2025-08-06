import * as cheerio from 'cheerio';
import { COMIC_DATABASES } from './comic-databases.config';
import { ComicIssueT } from './comic-issues.definitions';

export async function scrapeComicIssueUseCase(
  comicUrl: string,
  options?: {
    readDate: Date;
  }
): Promise<ComicIssueT> {
  const { readDate } = options || {};

  // Buscar la base de datos correspondiente según la URL
  const database = Object.values(COMIC_DATABASES).find(dbConfig =>
    comicUrl.includes(dbConfig.domain)
  );

  if (!database) {
    throw new Error('Database not found for the provided URL');
  }

  try {
    const response = await fetch(comicUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    // Validar que el scrapper existe
    if (
      !('scrapper' in database) ||
      ('scrapper' in database && typeof database.scrapper !== 'function')
    ) {
      throw new Error(
        `Scraper or adapter function not found for database: ${database.name}`
      );
    }

    const scrapedData = database.scrapper(comicUrl, $);
    const comicIssue = database.adapter(scrapedData);

    comicIssue.bindedData = {
      readDate,
    };

    return comicIssue;
  } catch (error) {
    throw new Error(
      `Error scraping comic: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
