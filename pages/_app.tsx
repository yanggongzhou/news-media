import { useEffect } from "react";
import type { AppProps } from 'next/app';
import { debounce } from "throttle-debounce";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import '@/styles/globals.scss'

export default function App({ Component, pageProps, router }: AppProps) {

  const nprogressEve = debounce(300, () => {
    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });
    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });
    router.events.on("routeChangeError", () => {
      NProgress.done();
    });
  }, { atBegin: true });

  useEffect(() => {
    nprogressEve();
  }, []); // eslint-disable-line

  return <Component {...pageProps} />
}
