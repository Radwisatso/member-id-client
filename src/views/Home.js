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

    const [data, setData] = useState(null);
    const [types, setTypes] = useState(null);
    const [initialPoint, setInitialPoint] = useState(0);

    const { pathname } = useLocation();

    useEffect(() => {
        console.log(pathname)
    }, [pathname])

    // AOS animation - pagination loading
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const result = await getAllAwards(types, initialPoint);
                console.log(result.data)
                setData(result.data);
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [pathname, types, initialPoint])
    return (
        <ContentContainer
            content={
                <>
                    <Header />
                    <HomeContainer>
                        {
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