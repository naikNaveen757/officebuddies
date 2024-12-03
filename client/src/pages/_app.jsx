import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import "../app/globals.css";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <>{isLoading ? <Loader /> : <Component {...pageProps} />}</>;
}

export default MyApp;
