import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import api from "../services/api";
import styles from "./home.module.scss";
import { PlayerContext } from "../contexts/PlayerContext";

// geração estatica
export const getStaticProps: GetStaticProps = async () => {
    const response = await api.get("episodes", {
        params: {
            _limit: 12,
            _sort: "published_at",
            _order: "desc",
        },
    });

    const episodes = response.data.map((episode) => ({
        id: episode.id,
        title: episode.title,
        thumbnail: episode.thumbnail,
        description: episode.description,
        members: episode.members,
        published_at: format(parseISO(episode.published_at), "d MMM yy", { locale: ptBR }),
        duration: Number(episode.file.duration),
        url: episode.file.url,
        type: episode.file.type,
        durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
    }));

    const latestEpisodes = episodes.slice(0, 2);
    const allEpisodes = episodes.slice(2, episodes.length);

    return {
        props: { latestEpisodes, allEpisodes },
        revalidate: 60 * 60 * 8,
    };
};

interface Episode {
    id: string;
    title: string;
    members: string;
    published_at: string;
    thumbnail: string;
    description: string;
    durationAsString: string;
    duration: number;
    url: string;
}

interface HomeProps {
    allEpisodes: Array<Episode>;
    latestEpisodes: Array<Episode>;
}

const Home: React.FC<HomeProps> = ({ allEpisodes, latestEpisodes }) => {
    const player = useContext(PlayerContext);

    return (
        <div className={styles.homepage}>
            <section className={styles.latestEpisodes}>
                <h2>Últimos lançamentos</h2>

                <ul>
                    {latestEpisodes.map((episode) => (
                        <li key={episode.id}>
                            <Image
                                width={192}
                                height={192}
                                objectFit="cover"
                                src={episode.thumbnail}
                                alt={episode.title}
                                title={episode.title}
                            />

                            <div className={styles.episodeDetails}>
                                <Link href={`episodes/${episode.id}`}>
                                    <a>{episode.title}</a>
                                </Link>
                                <p>{episode.members}</p>
                                <span>{episode.published_at}</span>
                                <span>{episode.durationAsString}</span>
                            </div>

                            <button type="button" onClick={() => player.play(episode)}>
                                <img src="/play-green.svg" alt="Tocar" title="Tocar" />
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles.allEpisodes}>
                <h2>Todos episódios</h2>

                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Podcast</th>
                            <th>Integrantes</th>
                            <th>Data</th>
                            <th>Duração</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {allEpisodes.map((episode) => (
                            <tr key={episode.id}>
                                <td style={{ width: 72 }}>
                                    <Image
                                        src={episode.thumbnail}
                                        alt={episode.title}
                                        width={120}
                                        height={120}
                                        objectFit="cover"
                                    />
                                </td>

                                <td>
                                    <Link href={`episodes/${episode.id}`}>
                                        <a>{episode.title}</a>
                                    </Link>
                                </td>

                                <td>{episode.members}</td>

                                <td style={{ width: 100 }}>{episode.published_at}</td>

                                <td>{episode.durationAsString}</td>

                                <td>
                                    <button type="button">
                                        <img src="/play-green.svg" alt="Tocar episódio" title="Tocar episódio" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Home;
