// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { link = 'https://new.qq.com/rain/a/20230912A06YYY00' } = req.query;
  console.log('start=======>', link);
  let aHref = "";
  let resText = "nothing"
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(link);
    // @ts-ignore
    resText = await page.$eval('#ArticleContent', el => el?.innerText || '');
  } catch (e) {

  } finally {
    browser.close();
  }
  console.log('aHref=======>', aHref);
  res.status(200).json({ text: resText })
}
