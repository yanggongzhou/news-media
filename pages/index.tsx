import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import HomeHeader from "@/components/home/header/index";
import { EPlatform, IRssResult } from "@/types/index.interfaces";
import { BrowseData } from "@/utils/rsshub";
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/Home.module.scss'
import RSSHub from "rsshub";
// const RSSHub = require("rsshub");
// import { Button } from "antd";

interface IProps {
  data: IRssResult;
  platform: EPlatform;
}

const Home: NextPage<IProps> = ({ data, platform}) => {

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

      {/*<Button>1212121212</Button>*/}
      {data.item && data.item.length > 0 ? <div className={styles.newsList}>
        <div className={styles.newsHeader}>
          <Image
            className={styles.newsIcon}
            width={50}
            height={50}
            src={`/images/${platform}.png`}
            alt={''}
          />
          <h1>{data.title}</h1>
          <div className={styles.newsTotal}>
            共{data.item.length || 0}条 <br/>更新时间：{ new Date(data.updated).toLocaleString() }
          </div>
        </div>
        { data.item.map((val, index) => {
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
  // const RSSHub = require("rsshub");
  const data = await RSSHub.request(`/zyw/hot/${platform}`);
  return {
    props: {
      data,
      platform,
    }
  }
}
