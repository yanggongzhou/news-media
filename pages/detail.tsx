import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";

interface IProps {
}

const Detail: NextPage<IProps> = () => {

  return (
    <div>
      detail
    </div>
  )
}

export default Detail;

export const getServerSideProps: GetServerSideProps = async ({ query }): Promise<GetServerSidePropsResult<IProps>> => {
  // const response = await fetch(`http://localhost:3000/api/${platform}`)
  // const data = response.json() as IRssResult;
  // const RSSHub = require("rsshub");
  // const data = await RSSHub.request(`/zyw/hot/${platform}`);

  return {
    props: {
    }
  }
}
