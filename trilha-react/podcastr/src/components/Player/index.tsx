import React, { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";
import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Player: React.FC = () => {
    const player = useContext(PlayerContext);
    const audioRef = useRef<HTMLAudioElement>(null);

    const episode = player.episodeList[player.currentEpisodeIndex];

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (player.isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [player.isPlaying]);

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="player" title="player" />
                <strong>Tocando agora </strong>
            </header>

            {episode && (
                <div className={styles.currentEpisode}>
                    <Image width={592} height={592} src={episode.thumbnail} objectFit="cover" />

                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
            )}

            {!episode && (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}

            <footer className={!episode ? styles.empty : ""}>
                <div className={styles.progress}>
                    <span>00:00</span>

                    <div className={styles.slider}>
                        {episode && (
                            <Slider
                                trackStyle={{
                                    backgroundColor: "#04d361",
                                }}
                                railStyle={{ backgroundColor: "#9f75ff" }}
                                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
                            />
                        )}

                        {!episode && <div className={styles.emptySlider}></div>}
                    </div>

                    <span>00:00</span>
                </div>

                {episode && (
                    <audio
                        ref={audioRef}
                        src={episode.url}
                        autoPlay
                        onPlay={() => player.setPlayingState(true)}
                        onPause={() => player.setPlayingState(false)}
                    ></audio>
                )}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="embaralhar" title="embaralhar" />
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="/play-previous.svg" alt="Tocar anterior" title="Tocar anterior" />
                    </button>

                    <button type="button" className={styles.playButton} disabled={!episode} onClick={player.togglePlay}>
                        {player.isPlaying && <img src="/pause.svg" alt="Tocar" title="Tocar" />}
                        {!player.isPlaying && <img src="/play.svg" alt="Tocar" title="Tocar" />}
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="/play-next.svg" alt="Tocar próxima" title="Tocar próxima" />
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir" title="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Player;
