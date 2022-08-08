import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// styled components
import styled from "styled-components";
import { Close } from "@styled-icons/evil/Close";

// React Burger Menu
import { slide as Menu } from 'react-burger-menu';

// Icons
import StarIcon from '../icons/star_icon.png';

// Material UI
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Header({
    data,
    types,
    initialPoint,
    handleTypes,
    handleInitialPoint,
    handleSubmit
}) {

    const location = useLocation();
    const navigate = useNavigate();

    const [isFilterOpen, setFilterOpen] = useState(false);
    const [isAllType, setAllType] = useState(false);
    const maximumPoint = 500000

    const filterStyles = {
        bmMenuWrap: {
            width: '100%',
        }
    }

    function logout() {
        localStorage.removeItem('email')
        navigate('/')
    }

    function handleDeletePoint() {
        handleInitialPoint(0)
    }

    function handleDeleteType() {
        setAllType(false)
        handleTypes([])
    }

    function handleClearAll() {
        handleInitialPoint(0)
        handleTypes([])
        setAllType(false)
    }

    function handleFilter() {
        setFilterOpen(false)
        handleSubmit()
    }

    function checkSelectedType(type) {
        if (type === 'All Type') {
            if (!isAllType) {
                setAllType(!isAllType)
                handleTypes(["Vouchers", "Products", "Gadgets"])
            } else {
                setAllType(!isAllType)
                handleTypes([])
            }
        } else {
            if (types.indexOf(type) < 0) {
                handleTypes([...types, type])
            } else {
                handleTypes(types.filter(content => content !== type))
                setAllType(false)
            }
        }
    }

    // override styling
    useEffect(() => {
        const burgerLine = "menu-bar";
        const filterLine = "filter-bar"
        document.getElementsByClassName(burgerLine)[2].style.width = '80%'
        document.getElementsByClassName(filterLine)[0].style.width = '40%'
        document.getElementsByClassName(filterLine)[1].style.width = '60%'
        document.getElementsByClassName(filterLine)[2].style.width = '80%'
    })

    return (
        <NavigationBar>
            <OptionsContainer>
                <Menu
                    noOverlay={false}
                    htmlClassName={"menu-html"}
                    bodyClassName={"menu-body"}
                    burgerButtonClassName={"menu-button"}
                    burgerBarClassName={"menu-bar"}
                    itemClassName={"menu-item"}
                    menuClassName={"menu"}
                    crossButtonClassName={"menu-cross-button"}
                    crossClassName={"menu-cross"}
                    overlayClassName={"menu-overlay"}
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
                <Menu
                    right
                    noOverlay={false}
                    disableOverlayClick
                    isOpen={isFilterOpen}
                    onOpen={() => setFilterOpen(true)}
                    onClose={() => setFilterOpen(false)}
                    styles={filterStyles}
                    htmlClassName={"filter-html"}
                    bodyClassName={"filter-body"}
                    burgerButtonClassName={"filter-button"}
                    burgerBarClassName={"filter-bar"}
                    itemClassName={"filter-item"}
                    menuClassName={"filter"}
                    crossButtonClassName={"filter-cross-button"}
                    crossClassName={"filter-cross"}
                    overlayClassName={"filter-overlay"}
                >
                    <BurgerTitleMenu>
                        Filter
                    </BurgerTitleMenu>
                    <FilterTagContainer>
                        {
                            types.length > 0 ? ( //must be change later
                                <FilterTag>
                                    <FilterTagText>
                                        Type: {types.map(value => `${value}, `)}
                                    </FilterTagText>
                                    <StyledClose onClick={handleDeleteType} />
                                </FilterTag>
                            )
                                :
                                null
                        }
                        {
                            initialPoint > 0 ? ( //must be change later
                                <FilterTag>
                                    <FilterTagText>
                                        Poin: {initialPoint} - {maximumPoint}
                                    </FilterTagText>
                                    <StyledClose onClick={handleDeletePoint} />
                                </FilterTag>
                            )
                                :
                                null
                        }
                        {
                            initialPoint > 0 && types.length > 0 ? (
                                <FilterTag style={{ cursor: 'pointer' }} onClick={handleClearAll}>
                                    <FilterTagText>
                                        Clear All Filter
                                    </FilterTagText>
                                </FilterTag>
                            )
                                :
                                null
                        }
                    </FilterTagContainer>
                    <BurgerSubtitleMenu>
                        Poin Needed
                    </BurgerSubtitleMenu>
                    <PointContainer style={{ display: 'flex' }}>
                        <PointText>
                            IDR {initialPoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </PointText>
                        <PointText>
                            IDR {maximumPoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </PointText>
                    </PointContainer>
                    <Slider
                        size="medium"
                        defaultValue={0}
                        aria-label="medium-slider"
                        valueLabelDisplay="auto"
                        max={maximumPoint}
                        marks
                        step={50000}
                        onChange={(event) => handleInitialPoint(event.target.value)}
                    />
                    <BurgerSubtitleMenu>
                        Awards Needed
                    </BurgerSubtitleMenu>
                    <StyledFormGroup>
                        <FormControlLabel control={
                            <Checkbox
                                checked={isAllType}
                                onChange={() => checkSelectedType('All Type')}
                            />
                        } label="All Type" />
                        <FormControlLabel control={
                            <Checkbox
                                checked={types.indexOf('Vouchers') > -1}
                                onChange={() => checkSelectedType('Vouchers')}
                            />
                        } label="Vouchers" />
                        <FormControlLabel control={
                            <Checkbox
                                checked={types.indexOf('Products') > -1}
                                onChange={() => checkSelectedType('Products')}
                            />
                        } label="Products" />
                        <FormControlLabel control={
                            <Checkbox
                                checked={types.indexOf('Gadgets') > -1}
                                onChange={() => checkSelectedType('Gadgets')}
                            />
                        } label="Gadgets" />
                    </StyledFormGroup>
                    <FilterButtonContainer>
                        <FilterButton onClick={handleFilter}>
                            Filter
                        </FilterButton>
                    </FilterButtonContainer>
                </Menu>
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

const BurgerSubtitleMenu = styled.h4`
    color: #636363;
    margin-top: 2em;
`

const BurgerListMenu = styled.a`
    font-weight: 500;
    color: ${({ location, route }) => location.includes(route) ? 'black' : '#AAAAAA'};
`

const OptionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const FilterTagContainer = styled.div`
    max-width: 13em;
`

const FilterTagText = styled.p`
    margin: 0;
    font-size: 14px;
`

const FilterTag = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid #1D5BF5;
    border-radius: 10px;
    margin: 0.5em 0;
    padding: 0.3em 0.5em;
    color: #1D5BF5;
    font-weight: 500;
`
const StyledClose = styled(Close)`
    width: 15px;
    height: 15px;
    background-color: #1D5BF5;
    color: white;
    border-radius: 100%;
    padding: 2px;
    margin-left: 1em;
    cursor: pointer;
`

const PointContainer = styled.div`
    justify-content: space-between;
    color: #1D5BF5;
    font-weight: 600;
`

const PointText = styled.p`
    font-size: 20px;
    margin: 0;
`

const StyledFormGroup = styled(FormGroup)`
    display: flex !important;
    flex-direction: column;
`

const FilterButtonContainer = styled.div`
    margin: 1em 0;
    display: flex !important;
    justify-content: center;
`

const FilterButton = styled.button`
    font-size: 14px;
    background-color: #1D5BF5;
    border: none;
    border-radius: 5px;
    color: white;
    width: 100%;
    height: 50px;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`