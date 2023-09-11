import { FC } from "react";
import styles from '@/components/home/header/index.module.scss'

interface IProps {}

const HomeHeader: FC<IProps> = () => {
  return (
    <div className={styles.headerWrap}>
      <div>
        news
      </div>
    </div>
  )
}

export default HomeHeader;
