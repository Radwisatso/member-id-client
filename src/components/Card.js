import { Box, Card, CardMedia } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function CardGift({
    title = 'title here',
    point = 'point here',
    type = 'type here',
    imageSrc = "https://mui.com/static/images/cards/contemplative-reptile.jpg",
    key,
    ...props
}) {

    const location = useLocation();

    const [isLoading, setLoading] = useState(true);

    const lazyImage = `https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg`

    // lazy loading
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [location])

    return (
        <Box sx={{ minWidth: 275, margin: '1em' }} key={key} {...props}>
            <Card>
                <CardTypeContainer>
                    <CardType type={type}>
                        {type}
                    </CardType>
                </CardTypeContainer>
                {
                    isLoading ?
                        <CardMedia
                            component="img"
                            height="200"
                            image={lazyImage}
                            alt="card"
                        />
                        :
                        <CardMedia
                            component="img"
                            height="200"
                            image={imageSrc}
                            alt="card"
                        />

                }
            </Card>
            <CardPointContainer>
                <CardPoint>
                    {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} poin
                </CardPoint>
            </CardPointContainer>
            <CardTextContainer>
                <p>
                    {title}
                </p>
            </CardTextContainer>
        </Box>
    )
}

export default CardGift;

const CardTypeContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const CardType = styled.div`
    position: absolute;
    background-color: ${({ type }) => {
        switch (type) {
            case 'Vouchers':
                return '#1D5BF5'
            case 'Products':
                return '#D06737'
            default:
                return 'white'
        }
    }};
    color: ${({ type }) => {
        switch (type) {
            case 'Vouchers':
                return 'white'
            case 'Products':
                return 'white'
            default:
                return 'black'
        }
    }};
    padding: 0.5em;
    margin: 1em;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    font-weight: 500;
`

const CardPointContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`

const CardPoint = styled.div`
    position: absolute;
    background-color: black;
    color: white;
    padding: 0.5em;
    margin-left: 0.3em;
    margin-top: -2.5em;
    border-radius: 10px;
    font-weight: 500;
`

const CardTextContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    font-weight: 600;
`

