import { marvelComicsFandomScrapedDataToComicIssueAdapter } from '@/app/api/_databases/marvel.fandom/comics/issues/_core/marvel.fandom.comic-issues.adapters';
import { scrapeMarvelComicsFandomComicIssue } from '@/app/api/_databases/marvel.fandom/comics/issues/_core/marvel.fandom.comic-issues.lib';
import { ComicDatabaseT } from './comic-databases.definitions';
import { MarvelComicsFandomScrapedComicIssueDataT } from '@/app/api/_databases/marvel.fandom/comics/issues/_core/marvel.fandom.comic-issues.definitions';

export const COMIC_DATABASES = {
  leagueOfComicGeeks: {
    name: 'League of Comic Geeks',
    domain: 'leagueofcomicgeeks.com',
    type: 'App',
    // scrapper:
  },
  marvelComicsFandom: {
    name: 'Marvel Comics Database',
    domain: 'marvel.fandom.com',
    type: 'Wiki',
    defaultPublisher: 'Marvel Comics',
    scrapper: scrapeMarvelComicsFandomComicIssue,
    adapter: marvelComicsFandomScrapedDataToComicIssueAdapter,
  },
  dcComicsFandom: {
    name: 'DC Comics Database',
    domain: 'dc.fandom.com',
    type: 'Wiki',
    defaultPublisher: 'DC Comics',
  },
  imageComicsFandom: {
    name: 'Image Comics Database',
    domain: 'imagecomics.fandom.com',
    type: 'Wiki',
    defaultPublisher: 'Image Comics',
  },
} as const satisfies Record<string, ComicDatabaseT>;
