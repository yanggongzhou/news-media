// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log('start=======>');
  const { link } = req.query;
  const url = "https://www.baidu.com/s?wd=%E5%B0%8F%E6%97%B6%E5%80%99%E6%B2%A1%E7%A9%BA%E8%B0%83%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%A7%89%E5%BE%97%E7%83%AD&usm=5&ie=utf-8&rsv_pq=8bb66c9f00033119&oq=puppeteer&rsv_t=b402dNUn86Dmn7%2B8EmJpDSlrFpwOdDImCRQgS5%2BQAYvvG5tS4IJdkuOM2s0&rqid=8bb66c9f00033119&rsf=8b3b44b7921bf12f3b0939c0713d07cd_1_15_7&rsv_dl=0_right_fyb_pchot_20811&sa=0_right_fyb_pchot_20811"
  let aHref = "";
  let resText = "nothing"
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(link as string || url, {waitUntil: 'networkidle0'});
    // @ts-ignore
    aHref = await page.$eval('.tts-title', el => el.href);
    // const headerdomEve = await page.$('#header')
    // console.log(headerdomEve)
    if (aHref) {
      await page.goto(aHref, {waitUntil: 'networkidle0'} );
      resText = await page.$eval('div[data-testid=article]', el => el.innerText)
    }
    await browser.close();
  } catch (e) {
    await browser.close();
  }
  console.log('aHref=======>', aHref);
  res.status(200).json({ text: resText })
}
