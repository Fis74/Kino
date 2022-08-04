import "normalize.css";
import "../styles/main.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import "nprogress/nprogress.css";
import { useStore, wrapper } from "../store/store";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  NProgress.configure({
    showSpinner: false,
  });
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Provider store={store}>
      <>
        <Head>
          <title>kino</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>
        <Component {...pageProps} />
      </>
    </Provider>
  );
};

export default MyApp;
