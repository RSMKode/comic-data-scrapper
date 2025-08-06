import { marvelFandomScrapedDataToComicIssueAdapter } from '@/app/api/_databases/marvel.fandom/comics/issues/_core/marvel.fandom.comic-issues.adapters';
import { scrapeMarvelFandomComicIssue } from '@/app/api/_databases/marvel.fandom/comics/issues/_core/marvel.fandom.comic-issues.lib';
import { ComicDatabaseT } from './comic-databases.definitions';
import { MarvelFandomScrapedComicIssueDataT } from '@/app/api/_databases/marvel.fandom/comics/issues/_core/marvel.fandom.comic-issues.definitions';
import { scrapeDCFandomComicIssue } from '@/app/api/_databases/dc.fandom/comics/issues/_core/dc.fandom.comic-issues.lib';
import { dcFandomScrapedDataToComicIssueAdapter } from '@/app/api/_databases/dc.fandom/comics/issues/_core/marvel.fandom.comic-issues.adapters';

export const COMIC_DATABASES = {
  leagueOfComicGeeks: {
    name: 'League of Comic Geeks',
    domain: 'leagueofcomicgeeks.com',
    type: 'App',
    // scrapper:
  },
  marvelFandom: {
    name: 'Marvel Comics Database',
    domain: 'marvel.fandom.com',
    type: 'Wiki',
    defaultPublisher: 'Marvel Comics',
    scrapper: scrapeMarvelFandomComicIssue,
    adapter: marvelFandomScrapedDataToComicIssueAdapter,
  },
  dcFandom: {
    name: 'DC Comics Database',
    domain: 'dc.fandom.com',
    type: 'Wiki',
    defaultPublisher: 'DC Comics',
    scrapper: scrapeDCFandomComicIssue,
    adapter: dcFandomScrapedDataToComicIssueAdapter
  },
  imageFandom: {
    name: 'Image Comics Database',
    domain: 'imagecomics.fandom.com',
    type: 'Wiki',
    defaultPublisher: 'Image Comics',
  },
} as const satisfies Record<string, ComicDatabaseT>;
