import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Styled components
import styled from "styled-components";

// Container
import ContentContainer from "../common/container";
import CardGift from "../components/Card";

// API
import { getAllAwards } from "../apis/GetAllAwards";

// AOS animation
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";

function Home() {

    const [data, setData] = useState([]);
    const [types, setTypes] = useState([]);
    const [initialPoint, setInitialPoint] = useState(0);

    const { pathname } = useLocation();

    // Handle filter
    async function submitFilter() {
        try {
            const result = await getAllAwards(types, initialPoint);
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    // AOS animation - pagination loading
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    // Fetch data after login
    useEffect(() => {
        async function getData() {
            try {
                const result = await getAllAwards(types, initialPoint);
                setData(result.data);
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [pathname])

    return (
        <ContentContainer
            content={
                <>
                    <Header
                        data={data}
                        types={types}
                        handleTypes={setTypes}
                        initialPoint={initialPoint}
                        handleInitialPoint={setInitialPoint}
                        handleSubmit={submitFilter}
                    />
                    <HomeContainer>
                        {
                            data.length > 0 ?
                                data?.map(value => {
                                    return (
                                        <CardGift
                                            data-aos="fade-zoom-in"
                                            data-aos-once
                                            key={value.id}
                                            title={value.name}
                                            point={value.point}
                                            type={value.type}
                                            imageSrc={value.image}
                                        />
                                    )
                                })
                                :
                                <>
                                    <AwardsNotFound>
                                        No Awards Found
                                    </AwardsNotFound>
                                    <img 
                                        src="https://cdn.discordapp.com/attachments/796711355876245534/1006062542868721784/2953962.jpg"
                                        alt="not found awards"
                                        width={250}
                                    />
                                </>
                        }
                    </HomeContainer>
                </>
            }
        />
    )
}

export default Home;

const HomeContainer = styled.div`
    gap: 1em;
    margin-top: 8em;
    padding: 0 2.5em;
`

const AwardsNotFound = styled.h2`
`