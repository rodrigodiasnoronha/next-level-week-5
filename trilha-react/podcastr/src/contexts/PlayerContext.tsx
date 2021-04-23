import React, { createContext, useState } from "react";

interface Episode {
    id: string;
    title: string;
    duration: number;
    members: string;
    thumbnail: string;
    url: string;
}

interface PlayerContextProps {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    hasPrevious: boolean;
    hasNext: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play(episode: Episode): void;
    togglePlay(): void;
    toggleLoop(): void;
    toggleShuffle(): void;
    setPlayingState(value: boolean): void;
    playList(list: Episode[], index: number): void;
    clearPlayerState(): void;
    playNext(): void;
    playPrev(): void;
}

export const PlayerContext = createContext<PlayerContextProps>({} as PlayerContextProps);

export const PlayerContextProvider: React.FC = ({ children }) => {
    const [episodeList, setEpisodeList] = useState<Episode[]>([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLooping, setIsLooping] = useState<boolean>(false);
    const [isShuffling, setIsShuffling] = useState<boolean>(false);

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = currentEpisodeIndex + 1 < episodeList.length || isShuffling;

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);

        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function setPlayingState(value: boolean) {
        setIsPlaying(value);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function playNext() {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (hasNext) {
            const nextEpisodeIndex = currentEpisodeIndex + 1;
            setCurrentEpisodeIndex(nextEpisodeIndex);
        }
    }

    function playPrev() {
        if (hasPrevious) {
            const prevEpisodeIndex = currentEpisodeIndex - 1;
            setCurrentEpisodeIndex(prevEpisodeIndex);
        }
    }

    function clearPlayerState() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                isPlaying,
                togglePlay,
                setPlayingState,
                playList,
                playNext,
                playPrev,
                hasPrevious,
                hasNext,
                toggleLoop,
                isLooping,
                isShuffling,
                toggleShuffle,
                clearPlayerState,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
