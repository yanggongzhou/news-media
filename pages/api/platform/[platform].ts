// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IRssResult } from "@/types/index.interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IRssResult>
) {
  const RSSHub = require('rsshub');
  RSSHub.init({
    // config
    CACHE_TYPE: null, // 禁用缓存
  });
  RSSHub.request(`/zyw/hot/${req.query.platform}`)
    .then((data) => {
      res.status(200).json(data)
    }).catch((e) => {
      res.status(200).json({} as IRssResult)
    });

}
