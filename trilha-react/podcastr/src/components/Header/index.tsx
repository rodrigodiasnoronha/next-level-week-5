import React from "react";
import styles from "./styles.module.scss";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

const Header: React.FC = () => {
  const currentDate = format(new Date(), "EEEEEEE, d MMM", { locale: ptBR });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="logo" title="logo" />
      <p>O melhor para você curtir, sempre</p>
      <span>{currentDate}</span>
    </header>
  );
};

export default Header;
