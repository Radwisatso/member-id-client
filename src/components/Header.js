import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// styled components
import styled from "styled-components";

// React Burger Menu
import { slide as Menu } from 'react-burger-menu';

// Icons
import StarIcon from '../icons/star_icon.png';

function Header() {

    const location = useLocation();
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('email')
        navigate('/')
    }

    useEffect(() => {
        const burgerLine = "bm-burger-bars";
        document.getElementsByClassName(burgerLine)[2].style.width = '80%'
    })

    return (
        <NavigationBar>
            <OptionsContainer>
                <Menu
                    noOverlay={false}
                    id='menu'
                    className='menu-bar'
                >
                    <BurgerMenuImage
                        src={StarIcon}
                        alt="star menu"
                        width={75}
                    />
                    <BurgerTitleMenu>
                        Awards Menu
                    </BurgerTitleMenu>
                    <BurgerListMenu
                        onClick={() => navigate('/home')}
                        location={location.pathname}
                        route='/home'
                    >
                        Home
                    </BurgerListMenu>
                    <BurgerListMenu
                        location={location.pathname}
                        route='/cards'
                    >
                        Cards
                    </BurgerListMenu>
                    <BurgerListMenu
                        location={location.pathname}
                        route='/profile'
                    >
                        Profile
                    </BurgerListMenu>
                    <BurgerListMenu
                        onClick={logout}
                        location={location.pathname}
                        route='/logout'
                    >
                        Logout
                    </BurgerListMenu>
                </Menu>
                <p>
                    Filter Section
                </p>
            </OptionsContainer>
        </NavigationBar>
    )
};

export default Header;

const NavigationBar = styled.div`
    position: fixed;
    width: 100%;
    max-width: inherit;
    height: 4em;
    z-index: 9999;
    margin-top: -1px;
    padding: -1em 0;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

const BurgerMenuImage = styled.img`
    margin-bottom: 40px;
`

const BurgerTitleMenu = styled.h2`
    
`

const BurgerListMenu = styled.a`
    font-weight: 500;
    color: ${({ location, route }) => location.includes(route) ? 'black' : '#AAAAAA'};
`

const OptionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`