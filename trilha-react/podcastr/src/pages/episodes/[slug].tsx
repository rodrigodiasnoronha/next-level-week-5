import { parseISO } from "date-fns";
import format from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import api from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import styles from "./episode.module.scss";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { data } = await api.get(`episodes/${context.params.slug}`);

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        description: data.description,
        members: data.members,
        published_at: format(parseISO(data.published_at), "d MMM yy", { locale: ptBR }),
        duration: Number(data.file.duration),
        url: data.file.url,
        type: data.file.type,
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    };

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24, //24 horas
    };
};

interface EpisodeProps {
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

const Episode: React.FC<{ episode: EpisodeProps }> = ({ episode }) => {
    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar" title="Voltar" />
                    </button>
                </Link>

                <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" />

                <button type="button">
                    <img src="/play.svg" alt="Tocar episódio" />
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.published_at}</span>
                <span>{episode.duration}</span>
            </header>

            <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
        </div>
    );
};

export default Episode;
