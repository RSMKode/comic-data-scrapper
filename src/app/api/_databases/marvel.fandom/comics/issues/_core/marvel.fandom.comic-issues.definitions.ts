import { ComicDatabaseSchema } from "@/app/api/comics/issues/_core/comic-databases.definitions";
import { ComicIssueReferenceSchema } from "@/app/api/comics/issues/_core/comic-issues.definitions";
import { z } from "zod";


export const MarvelFandomScrapedComicIssueDataSchema = z.object({
  database: ComicDatabaseSchema,
  publisher: z.string(),
  comicUrl: z.string(),
  title: z.string(),
  collection: z.string().optional(),
  imageURL: z.string().optional(),
  eventOrArc: z.array(z.string()).optional(),
  releaseDate: z.string().optional(),
  coverDate: z.string().optional(),
  previousIssues: z.array(ComicIssueReferenceSchema).optional(),
  nextIssues: z.array(ComicIssueReferenceSchema).optional(),
  writers: z.array(z.string()).optional(),
  pencilers: z.array(z.string()).optional(),
  inkers: z.array(z.string()).optional(),
  colorists: z.array(z.string()).optional(),
  letterers: z.array(z.string()).optional(),
  editors: z.array(z.string()).optional(),
  editorsInChief: z.array(z.string()).optional(),
});

export type MarvelFandomScrapedComicIssueDataT = z.infer<typeof MarvelFandomScrapedComicIssueDataSchema>;