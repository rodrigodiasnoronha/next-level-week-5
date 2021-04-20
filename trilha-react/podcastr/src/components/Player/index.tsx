import React from "react";
import styles from "./styles.module.scss";

const Player: React.FC = () => {
    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="player" title="player" />
                <strong>Tocando agora</strong>
            </header>

            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer className={styles.empty}>
                <div className={styles.progress}>
                    <span>00:00</span>

                    <div className={styles.slider}>
                        <div className={styles.emptySlider}></div>
                    </div>

                    <span>00:00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button">
                        <img src="/shuffle.svg" alt="embaralhar" title="embaralhar" />
                    </button>

                    <button type="button">
                        <img src="/play-previous.svg" alt="Tocar anterior" title="Tocar anterior" />
                    </button>

                    <button type="button" className={styles.playButton}>
                        <img src="/play.svg" alt="Tocar" title="Tocar" />
                    </button>

                    <button type="button">
                        <img src="/play-next.svg" alt="Tocar próxima" title="Tocar próxima" />
                    </button>

                    <button type="button">
                        <img src="/repeat.svg" alt="Repetir" title="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Player;
