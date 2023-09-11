export enum EPlatform {
  百度 =  "baidu",
  哔哩哔哩 = "bilibili",
  微博 = "weibo",
  知乎 = "zhihu",
  三十六氪 = "36kr",
  少数派 = "sspai",
  IT之家 = "ithome",
  澎湃新闻 = "thepaper",
  今日头条 = "toutiao",
  百度贴吧 = "tieba",
  稀土掘金 = "juejin",
  腾讯新闻 = "newsqq"
}

export interface IRssResult {
  lastBuildDate: string;
  updated: string;
  ttl: 5,
  atomlink: string;
  title: string;
  link: string;
  item: IRssResultItem[];
}

export interface IRssResultItem {
  link: string;
  title: string;
  description?: string;
}

