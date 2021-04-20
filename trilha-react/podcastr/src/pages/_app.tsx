import React from "react";
import { AppProps } from "next/app";

import "../styles/global.scss";
import styles from "../styles/app.module.scss";

import Header from "../components/Header";
import Player from "../components/Player";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>

      <Player />
    </div>
  );
};

export default MyApp;
