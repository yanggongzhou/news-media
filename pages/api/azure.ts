// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AzureKeyCredential, OpenAIClient } from "@azure/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const AZURE_ENDPOINT = "https://dz-ai-test.openai.azure.com/";
  const AZURE_API_KEY = "40fd83e3e53e47898bc42b5f3302eb29";

  const client = new OpenAIClient(AZURE_ENDPOINT, new AzureKeyCredential(AZURE_API_KEY));
  try {
    const { text = "" } = req.query
    // const text = "120万买的商铺出租后被改成公厕,赢了官司却无法复原?开发商回应"
    // const text = "9月11日，一则“济南市火灾现场”的视频在抖音等网络社交平台流传，引发网民关注。经与济南消防支队核实，消防部门未接到过类似火情，此消息纯属谣言。" +
    //   "类似火情谣言网上时有发生，一些网民在未取得证实的情况下，采取移花接木、断章取义等方式，吸引眼球，博取流量，传播谣言。" +
    //   "济南互联网联合辟谣平台在此提醒广大市民，对于突发事件，以官方权威消息为准，不轻信、不盲从、不传谣，做指尖上的智者。（来源：济南互联网联合辟谣平台）编辑:韩璐莹"
    const deploymentId = "text-davinci-003";
    const prompt = [`新闻稿润色: ${text}`];
    // const prompt = [`hello what's your name`];
    const result = await client.getCompletions(deploymentId, prompt, { maxTokens: 4000 });
    res.status(200).json({ text: result?.choices?.[0]?.text || '' });
  } catch (e) {
    res.status(200).json({ text: 'error' });
  }
}
