import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { usePlayer } from "../../hooks/usePlayer";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

const Player: React.FC = () => {
    const [progress, setProgress] = useState<number>(0);

    const player = usePlayer();
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

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener("timeupdate", function () {
            const progress = Math.floor(audioRef.current.currentTime);
            setProgress(progress);
        });
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisodeEnd() {
        if (player.hasNext) {
            player.playNext();
        } else {
            player.clearPlayerState();
        }
    }

    const episodeDuration = convertDurationToTimeString(episode?.duration ?? 0);
    const episodeProgress = convertDurationToTimeString(progress);

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
                    <span>{episodeProgress}</span>

                    <div className={styles.slider}>
                        {episode && (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{
                                    backgroundColor: "#04d361",
                                }}
                                railStyle={{ backgroundColor: "#9f75ff" }}
                                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
                            />
                        )}

                        {!episode && <div className={styles.emptySlider}></div>}
                    </div>

                    <span>{episodeDuration}</span>
                </div>

                {episode && (
                    <audio
                        ref={audioRef}
                        src={episode.url}
                        loop={player.isLooping}
                        autoPlay
                        onPlay={() => player.setPlayingState(true)}
                        onPause={() => player.setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                        onEnded={handleEpisodeEnd}
                    ></audio>
                )}

                <div className={styles.buttons}>
                    <button
                        type="button"
                        disabled={!episode || player.episodeList.length === 1}
                        onClick={player.toggleShuffle}
                        className={player.isShuffling && player.episodeList.length !== 1 ? styles.isActive : ""}
                    >
                        <img src="/shuffle.svg" alt="embaralhar" title="embaralhar" />
                    </button>

                    <button type="button" disabled={!episode || !player.hasPrevious} onClick={player.playPrev}>
                        <img src="/play-previous.svg" alt="Tocar anterior" title="Tocar anterior" />
                    </button>

                    <button type="button" className={styles.playButton} disabled={!episode} onClick={player.togglePlay}>
                        {player.isPlaying && <img src="/pause.svg" alt="Tocar" title="Tocar" />}
                        {!player.isPlaying && <img src="/play.svg" alt="Tocar" title="Tocar" />}
                    </button>

                    <button type="button" disabled={!episode || !player.hasNext} onClick={player.playNext}>
                        <img src="/play-next.svg" alt="Tocar próxima" title="Tocar próxima" />
                    </button>

                    <button
                        type="button"
                        disabled={!episode}
                        onClick={player.toggleLoop}
                        className={player.isLooping ? styles.isActive : ""}
                    >
                        <img src="/repeat.svg" alt="Repetir" title="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Player;
