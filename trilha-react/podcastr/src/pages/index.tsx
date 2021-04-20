import React, { useEffect } from "react";

// geração estatica
export async function getStaticProps() {
    const response = await fetch("http://localhost:3333/episodes");
    const data = await response.json();

    return {
        props: {
            episodes: data,
        },
        revalidate: 60 * 60 * 8,
    };
}

const Home: React.FC = () => {
    useEffect(() => {
        fetch("http://localhost:3333/episodes")
            .then((response) => {
                return response.json();
            })
            .then((episodes) => {
                console.table(episodes);
            });
    }, []);

    return <h2>Hello, WOrld</h2>;
};

export default Home;
// embuscadoproximonivel
