import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import HomeHeader from "@/components/home/header/index";
import { EPlatform, IRssResult, IRssResultItem } from "@/types/index.interfaces";
import { BrowseData } from "@/utils/rsshub";
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/Home.module.scss'
import { useEffect, useState } from "react";
import { debounce } from "throttle-debounce";
import { Button, Spin, message } from "antd";

interface IProps {
  // newsData: IRssResult;
  platform: EPlatform;
}

const Home: NextPage<IProps> = ({ platform}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(true);
  const [detailContent, setDetailContent] = useState('');
  const [aiContent, setAiContent] = useState('');
  const [newsData, setNewsData] = useState({
    updated: "-",
    title: "",
    item: [],
  } as IRssResult);
  const [newsList, setNewsList] = useState<IRssResultItem[]>([]);
  useEffect(() => {
    getNewsData();
  }, [platform]); // eslint-disable-line

  const getNewsData = debounce(300, async () => {
    setSpinning(true);
    setNewsData(prevState => ({ ...prevState, updated: '-', title: "" }));
    const response = await fetch(`/api/platform/${platform}`)
    const data = await response.json();
    setNewsData(data as IRssResult);
    setNewsList(data.item);
    setSpinning(false);
  }, { atBegin: true });

  // 取数据
  const getNewsDetail = debounce(300, async (item: IRssResultItem) => {
    setSpinning(true);
    const response = await fetch(`/api/newsqq?link=${item.link}`);
    const { text = '' } = await response.json();
    if (!text) {
      messageApi.info('数据获取失败');
      setSpinning(false);
      return;
    }
    setSpinning(false);
    setDetailContent(text)
  }, { atBegin: true });


  const getAiNewsDetail = debounce(300, async (item: IRssResultItem) => {
    setSpinning(true);
    const response = await fetch(`/api/azure?text=${item.title}`);
    const { text = '' } = await response.json();
    if (!text) {
      messageApi.info('数据获取失败');
      setSpinning(false);
      return;
    }
    setSpinning(false);
    setAiContent(text)
  }, { atBegin: true });

  return (
    <div className={styles.homeWrap}>
      <HomeHeader/>
      {contextHolder}

      <div className={styles.tagBox}>
        { BrowseData.map(val => {
          return <Link href={`/hot/${val.id}`} key={val.id} className={ val.id === platform ? styles.tagItemActive : styles.tagItem}>
            <Image
              className={styles.tagItemIcon}
              width={22}
              height={22}
              src={val.logo}
              alt={''}
            />
            <span>{val.label}</span>
          </Link>
        }) }
      </div>
      <div className={styles.newsList}>
        <div className={styles.newsHeader}>
          <Image
            className={styles.newsIcon}
            width={50}
            height={50}
            src={`/images/${platform}.png`}
            alt={''}
          />
          <h1>🔥{newsData.title}🔥</h1>
          <div className={styles.newsTotal}>
            共{newsList.length || 0}条 <br/>更新时间：{ newsData.updated }
          </div>
        </div>
        {detailContent ?<div className={styles.detailContent}>
          <h4>源内容</h4>
          <p>{detailContent}</p>
        </div> : null}
        {aiContent ?<div className={styles.detailContent}>
          <h4>ai内容</h4>
          <p>{aiContent}</p>
        </div> : null}
        <Spin size={"large"} spinning={spinning} tip="加载中..." style={{ minHeight: 500 }}>
          { newsList.map((val, index) => {
            return <div key={val.link} className={styles.newsItem}>
              <Link href={val.link} className={styles.newsItemLink} target={'_blank'}>
                <div className={styles.itemCount}>{ index + 1 }</div>
                <div className={styles.itemContent}>
                  <div className={styles.itemContentTitle}>{val.title}</div>
                  {val.description ? <p>{val.description}</p> : null}
                </div>
              </Link>
              <div>
                <Button className={styles.newsItemBtn} size={"small"} onClick={() => getAiNewsDetail(val)}>ai生成</Button>
                <Button className={styles.newsItemBtn} size={"small"} onClick={() => getNewsDetail(val)}>取数据</Button>
              </div>
            </div>
          }) }
        </Spin>
      </div>
    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }): Promise<GetServerSidePropsResult<IProps>> => {
  const platform = (query?.platform) as EPlatform || EPlatform.腾讯新闻;
  // const response = await fetch(`http://localhost:3000/api/${platform}`)
  // const data = response.json() as IRssResult;
  // const RSSHub = require("rsshub");
  // const data = await RSSHub.request(`/zyw/hot/${platform}`);

  return {
    props: {
      platform,
    }
  }
}
