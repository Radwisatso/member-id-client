import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Styled components
import styled from "styled-components";
import { getAllAwards } from "../apis/GetAllAwards";

// Container
import ContentContainer from "../common/container";
import CardGift from "../components/Card";


function Home() {

    const [data, setData] = useState(null);
    const [types, setTypes] = useState(null);
    const [initialPoint, setInitialPoint] = useState(0);

    const { pathname } = useLocation();

    useEffect(() => {
        console.log(pathname)
    }, [pathname])

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
                <HomeContainer>
                    {
                        data?.map(value => {
                            return (
                                <CardGift 
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
            }
        />
    )
}

export default Home;

const HomeContainer = styled.div`
    gap: 1em;

`