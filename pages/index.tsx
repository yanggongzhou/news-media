import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import HomeHeader from "@/components/home/header/index";
import { EPlatform, IRssResult } from "@/types/index.interfaces";
import { BrowseData } from "@/utils/rsshub";
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/Home.module.scss'
import { useEffect, useState } from "react";
import { debounce } from "throttle-debounce";

interface IProps {
  // newsData: IRssResult;
  platform: EPlatform;
}

const Home: NextPage<IProps> = ({ platform}) => {

  const [newsData, setNewsData] = useState({
    updated: "-",
    title: ""
  } as IRssResult);
  useEffect(() => {
    getNewsData();
  }, [platform]); // eslint-disable-line

  const getNewsData = debounce(300, async () => {
    const response = await fetch(`/api/platform/${platform}`)
    const data = await response.json();
    setNewsData(data as IRssResult);
  }, { atBegin: true });

  return (
    <div className={styles.homeWrap}>
      <HomeHeader/>

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

      {newsData.item && newsData.item.length > 0 ? <div className={styles.newsList}>
        <div className={styles.newsHeader}>
          <Image
            className={styles.newsIcon}
            width={50}
            height={50}
            src={`/images/${platform}.png`}
            alt={''}
          />
          <h1>🔥🔥🔥{newsData.title}</h1>
          <div className={styles.newsTotal}>
            共{newsData.item.length || 0}条 <br/>更新时间：{ newsData.updated }
          </div>
        </div>
        { newsData.item.map((val, index) => {
          return <Link href={val.link} key={val.link} className={styles.newsItem}>
            <div className={styles.itemCount}>{ index + 1 }</div>
            <div className={styles.itemContent}>
              <div className={styles.itemContentTitle}>{val.title}</div>
              {val.description ? <p>{val.description}</p> : null}
            </div>

          </Link>
        }) }
      </div> : null}
    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }): Promise<GetServerSidePropsResult<IProps>> => {
  const platform = (query?.platform) as EPlatform || EPlatform.百度;
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
