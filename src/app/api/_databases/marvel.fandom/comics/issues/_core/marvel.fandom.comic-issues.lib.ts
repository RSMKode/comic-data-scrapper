import { COMIC_DATABASES } from '@/app/api/comics/issues/_core/comic-databases.config';
import { MarvelComicsFandomScrapedComicIssueDataT } from './marvel.fandom.comic-issues.definitions';
import { CheerioAPI } from 'cheerio';
import { marvelComicsFandomScrapedDataToComicIssueAdapter } from './marvel.fandom.comic-issues.adapters';
import { ComicIssueT } from '@/app/api/comics/issues/_core/comic-issues.definitions';

export function scrapeMarvelComicsFandomComicIssue(
  comicUrl: string,
  $: CheerioAPI
): MarvelComicsFandomScrapedComicIssueDataT {
  const database = COMIC_DATABASES.marvelComicsFandom;
  const publisher = database.defaultPublisher;

  const title = $('h2.pi-title').text().trim();

  if (!title) {
    throw new Error(
      "Title not found. Please check the URL, maybe it's not a comic book."
    );
  }

  //   const collection = $("h2.pi-title a").text().trim();
  const collection = $('h2.pi-title a').attr('href')?.trim();

  const imageURL = $('a.image-thumbnail').attr('href')?.trim();

  const eventOrArcData = $('.pi-data-value > span > a').toArray();
  const eventOrArcArray = Array.from(
    new Set(
      eventOrArcData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const eventOrArc =
    eventOrArcArray.length > 0 && eventOrArcArray.length <= 4
      ? eventOrArcArray
      : [];

  const releaseDate = $("[data-source='ReleaseDate'] div").text().trim();

  const coverDate = $(".portable-infobox > div:contains('Cover Date') div")
    .text()
    .trim();

  const previousIssueData = $("[data-source='PreviousIssue'] a").toArray();
  const previousIssueArray = previousIssueData.map(element => ({
    title: $(element).attr('title') || '',
    href: $(element).attr('href') || '',
  }));
  const previousIssues =
    previousIssueArray.length > 0 ? previousIssueArray : [];

  const nextIssueData = $("[data-source='NextIssue'] a").toArray();
  const nextIssueArray = nextIssueData.map(element => ({
    title: $(element).attr('title') || '',
    href: $(element).attr('href') || '',
  }));
  const nextIssues = nextIssueArray.length > 0 ? nextIssueArray : [];

  const writersData = $("[data-source^='Writers'] div a").toArray();
  const writersArray = Array.from(
    new Set(
      writersData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const writers = writersArray.length > 0 ? writersArray : [];

  const pencilersData = $("[data-source^='Pencilers'] div a").toArray();
  const pencilersArray = Array.from(
    new Set(
      pencilersData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const pencilers = pencilersArray.length > 0 ? pencilersArray : [];

  const inkersData = $("[data-source^='Inkers'] div a").toArray();
  const inkersArray = Array.from(
    new Set(
      inkersData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const inkers = inkersArray.length > 0 ? inkersArray : [];

  const coloristsData = $("[data-source^='Colorists'] div a").toArray();
  const coloristsArray = Array.from(
    new Set(
      coloristsData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const colorists = coloristsArray.length > 0 ? coloristsArray : [];

  const letterersData = $("[data-source^='Letterers'] div a").toArray();
  const letterersArray = Array.from(
    new Set(
      letterersData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const letterers = letterersArray.length > 0 ? letterersArray : [];

  const editorsData = $("[data-source^='Editors'] div a").toArray();
  const editorsArray = Array.from(
    new Set(
      editorsData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const editors = editorsArray.length > 0 ? editorsArray : [];

  const editorInChiefData = $(
    "[data-source^='Editor-in-Chief'] div a"
  ).toArray();
  const editorInChiefArray = Array.from(
    new Set(
      editorInChiefData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const editorsInChief =
    editorInChiefArray.length > 0 ? editorInChiefArray : [];

  const scrapedData: MarvelComicsFandomScrapedComicIssueDataT = {
    comicUrl,
    database,
    publisher,
    title,
    collection,
    imageURL,
    eventOrArc,
    releaseDate,
    coverDate,
    previousIssues,
    nextIssues,
    writers,
    pencilers,
    inkers,
    colorists,
    letterers,
    editors,
    editorsInChief,
  };
  return scrapedData

  // const parsedIssueData =
  //   marvelComicsFandomScrapedDataToComicIssueAdapter(scrapedData);
  // return parsedIssueData;
}
