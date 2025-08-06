import { MarvelComicsFandomScrapedComicIssueDataT } from '@/app/api/_databases/marvel.fandom/comics/issues/_core/marvel.fandom.comic-issues.definitions';
import { COMIC_DATABASES } from '@/app/api/comics/issues/_core/comic-databases.config';
import { CheerioAPI } from 'cheerio';
import { DCComicsFandomScrapedComicIssueData } from './dc.fandom.comic-issues.definitions';

export function scrapeDCComicsFandomComicIssue(
  comicUrl: string,
  $: CheerioAPI
): DCComicsFandomScrapedComicIssueData {
  const database = COMIC_DATABASES.dcComicsFandom;
  const publisher = database.defaultPublisher;

  const title = $("h2[data-source='OneShot']").text().trim();

  if (!title) {
    throw new Error('Title not found. Please check the comic URL.');
  }

  const collection = $("h2[data-source='OneShot'] a").text().trim();

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

  const releaseDateData = $(
    "div.mw-parser-output:contains('published')"
  ).text();
  const dateRegex = /[A-Z][a-z]+ [0-9]{1,2}, [0-9]{4}/;
  const releaseDateMatch = releaseDateData.match(dateRegex);
  const releaseDate = releaseDateMatch ? releaseDateMatch[0] : '';

  const coverDate = $('h2.pi-item:nth-of-type(3)').text().trim();

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

  const writersData = $("[data-source^='Writer'] li a").toArray();
  const writersArray = Array.from(
    new Set(
      writersData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const writers = writersArray.length > 0 ? writersArray : [];

  const pencilersData = $("[data-source^='Penciler'] li a").toArray();
  const pencilersArray = Array.from(
    new Set(
      pencilersData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const pencilers = pencilersArray.length > 0 ? pencilersArray : [];

  const inkersData = $("[data-source^='Inker'] li a").toArray();
  const inkersArray = Array.from(
    new Set(
      inkersData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const inkers = inkersArray.length > 0 ? inkersArray : [];

  const coloristsData = $("[data-source^='Colorist'] li a").toArray();
  const coloristsArray = Array.from(
    new Set(
      coloristsData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const colorists = coloristsArray.length > 0 ? coloristsArray : [];

  const letterersData = $("[data-source^='Letterer'] li a").toArray();
  const letterersArray = Array.from(
    new Set(
      letterersData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const letterers = letterersArray.length > 0 ? letterersArray : [];

  const editorsData = $("[data-source^='Editor'] li a").toArray();
  const editorsArray = Array.from(
    new Set(
      editorsData
        .map(element => $(element).attr('title'))
        .filter((title): title is string => Boolean(title))
    )
  );
  const editors = editorsArray.length > 0 ? editorsArray : [];

  const editorInChiefData = $(
    "[data-source^='Editor-in-Chief'] li a"
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

  const scrapedData: DCComicsFandomScrapedComicIssueData = {
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
    editorsInChief
  };

  return scrapedData;
}
