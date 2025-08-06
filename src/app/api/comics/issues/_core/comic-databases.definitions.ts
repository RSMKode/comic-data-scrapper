
import z from 'zod';
import { ComicIssueT } from './comic-issues.definitions';
import { CheerioAPI } from 'cheerio';

export const ComicDatabaseDataTypeSchema = z.object({
  scrappedIssue: z.object()})
  export type ComicDatabaseDataTypeT = z.infer<typeof ComicDatabaseDataTypeSchema>;

export const ComicDatabaseSchema = z.object({
  name: z.string().min(1),
  domain: z.string().min(1),
  type: z.string().min(1),
  defaultPublisher: z.string().min(1).optional(),
});

export type ComicDatabaseT = z.infer<typeof ComicDatabaseSchema> & {
  scrapper?: (url: string, $: CheerioAPI) => unknown
  adapter?: (data: any, options?: { [key: string]: any }) => ComicIssueT;
};
