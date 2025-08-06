import z from 'zod';
import { ComicDatabaseSchema } from './comic-databases.definitions';

export const ComicIssueReferenceSchema = z.object({
  title: z.string(),
  href: z.string(),
  type: z.string().optional(),
});
export type ComicIssueReferenceT = z.infer<typeof ComicIssueReferenceSchema>;

export const ComicAuthorRoleEnumSchema = z.enum([
  'writer',
  'penciller',
  'inker',
  'colorist',
  'letterer',
  'editor',
  'editorInChief',
  'coverArtist',
  'variantCoverArtist',
  'translator',
  'publisher',
  'creator',
  'artist',
]);
export type ComicAuthorRoleEnumT = z.infer<typeof ComicAuthorRoleEnumSchema>;

export const ComicAuthorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  roles: z.array(ComicAuthorRoleEnumSchema).optional(),
});
export type ComicAuthorT = z.infer<typeof ComicAuthorSchema>;

export const ComicCollectionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  volume: z.string().min(1).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  publisher: z.string().min(1),
});
export type ComicCollectionT = z.infer<typeof ComicCollectionSchema>;

export const ComicArcSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  publisher: z.string().min(1),
});
export type ComicArcT = z.infer<typeof ComicArcSchema>;

export const ComicEventSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  publisher: z.string().min(1),
});
export type ComicEventT = z.infer<typeof ComicEventSchema>;

export const ComicIssueSchema = z.object({
  id: z.string().min(1),
  href: z.string().min(1),
  database: ComicDatabaseSchema,
  title: z.string().min(1),
  collection: ComicCollectionSchema,
  images: z.array(z.url().min(1)),
  events: z.array(ComicEventSchema).optional(),
  arcs: z.array(ComicArcSchema).optional(),
  releaseDate: z.coerce.date(),
  coverDate: z.coerce.date(),
  previousIssues: z.array(ComicIssueReferenceSchema).optional(),
  nextIssues: z.array(ComicIssueReferenceSchema).optional(),
  authors: z.array(ComicAuthorSchema).optional(),
  bindedData: z
    .object({
      readDate: z.coerce.date().optional(),
    })
    .optional(),
});
export type ComicIssueT = z.infer<typeof ComicIssueSchema>;
