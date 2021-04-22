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
    play(episode: Episode): void;
    togglePlay(): void;
    setPlayingState(value: boolean): void;
    isPlaying: boolean;
}

export const PlayerContext = createContext<PlayerContextProps>({} as PlayerContextProps);

export const PlayerContextProvider: React.FC = ({ children }) => {
    const [episodeList, setEpisodeList] = useState<Episode[]>([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);

        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function setPlayingState(value: boolean) {
        setIsPlaying(value);
    }

    return (
        <PlayerContext.Provider
            value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
