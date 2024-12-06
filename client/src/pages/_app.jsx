import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Common/Loader";
import "../app/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  <Head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Iceberg&family=Kode+Mono:wght@400..700&display=swap"
    rel="stylesheet"
  />
</Head>

  useEffect(() => {
    if (router.pathname === "/home") {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [router.pathname]);

  return <>{isLoading ? <Loader /> : <Component {...pageProps} />}</>;
}

export default MyApp;
