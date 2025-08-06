import z from 'zod';
import { API_CONFIG } from '../../api.config';
import { scrapeComic, transformScrapedDataToComicIssue } from './_core/comic-issues.use-cases';

export const GetComicDataFromIssueSchema = z.object({
  issueUrl: z.string().min(1, 'Issue URL is required'),
});

export const GET = async (request: Request) => {
  const searchParams = new URL(request.url).searchParams;
  
  // Convertir URLSearchParams a objeto plano
  const searchParamsObject = Object.fromEntries(searchParams.entries());

  const { data: parsedSearchParams, error } =
    GetComicDataFromIssueSchema.safeParse(searchParamsObject);

  if (error) {
    return new Response(JSON.stringify({ errors: error.issues.map(issue => issue.message) }), {
      status: 400,
      headers: API_CONFIG.baseHeaders,
    });
  }
  const { issueUrl } = parsedSearchParams;

  const scrappedData = await scrapeComic(issueUrl, new Date());
  if (!scrappedData) {
    return new Response(
      JSON.stringify({ error: 'Failed to scrape comic data' }),
      {
        status: 500,
        headers: API_CONFIG.baseHeaders,
      }
    );
  }
  const parsedScrapedData = transformScrapedDataToComicIssue(scrappedData);

  return new Response(JSON.stringify(parsedScrapedData), {
    status: 200,
    headers: API_CONFIG.baseHeaders,
  });
};
