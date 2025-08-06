import { ComicDatabaseT } from "@/app/api/comics/issues/_core/comic-databases.definitions";

export type DCFandomScrapedComicIssueDataT = {
  comicUrl: string;
  database: ComicDatabaseT
  publisher: string;
  title: string;
  collection?: string;
  imageURL?: string;
  eventOrArc?: string[];
  releaseDate?: string;
  coverDate?: string;
  previousIssues?: Array<{ title: string; href: string }>;
  nextIssues?: Array<{ title: string; href: string }>;
  writers?: string[];
  pencilers?: string[];
  inkers?: string[];
  colorists?: string[];
  letterers?: string[];
  editors?: string[];
  editorsInChief?: string[];
}