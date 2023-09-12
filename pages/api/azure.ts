// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const client = new OpenAIClient(process.env.AZURE_ENDPOINT, new AzureKeyCredential(process.env.AZURE_API_KEY));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const data = req.query
    const deploymentId = "text-davinci-003";
    const prompt = ["请以“在家长会上称投诉的都考不上高中“为主题生成500字小说"];
    const result = await client.getCompletions(deploymentId, prompt, { maxTokens: 4000 });
    res.status(200).json(result?.choices?.[0]?.text || '');

  } catch (e) {
    res.status(500).json('')
  }
}
