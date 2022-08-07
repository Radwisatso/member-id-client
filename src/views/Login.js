// Styled components
import { useState } from "react";
import styled from "styled-components";

// API
import { loginUser } from "../apis/LoginUser";

// Container
import ContentContainer from "../common/container";

// Icons
import StarIcon from '../icons/star_icon.png'

function Login() {
    const [isError, setError] = useState(false);
    const [email, setEmail] = useState('');

    async function login() {
        console.log('masuk')
        try {
            const result = await loginUser(email);
            console.log(result.data.result)
            if (result) {
                localStorage.setItem('email', result.data.result.email)
                setError(false);
                alert('Successfully login!')
            }
        } catch (error) {
            if (error.response.data === 'Email Address is not exists') {
                return setError(true);
            } 
            return alert('Internal server error')
        }
    }

    return (
        <ContentContainer
            content={
                <LoginContainer>
                    <LoginImage
                        src={StarIcon}
                        alt="star login"
                        width={200}
                    />
                    <LoginTitle>
                        AWARD
                    </LoginTitle>
                    <LoginSubtitle>
                        Enter your email address to sign in and continue
                    </LoginSubtitle>
                    <LoginInput placeholder="Email Address" onChange={(event) => setEmail(event.target.value)} />
                    {
                        isError && (
                            <LoginErrorMessage>
                                Email Address is not exists
                            </LoginErrorMessage>
                        )
                    }
                    <LoginButton onClick={login}>
                        Sign In
                    </LoginButton>
                </LoginContainer>
            }
        />
    )
}

export default Login;

const LoginContainer = styled.div`
    margin: 4em 0 4em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
`

const LoginImage = styled.img`
`

const LoginTitle = styled.h2`
    color: #636363;
`

const LoginSubtitle = styled.p`
    color: #636363;
    font-size: 20px;
    font-weight: 500;
    max-width: 350px;
`

const LoginInput = styled.input`
    width: 100%;
    padding: 0.5em;
    height: 30px;
    max-width: 350px;
    border-radius: 10px;
    border: 1px solid #AAAA;
    color: black;
    &::placeholder {
        color: #AAAAAA;
        font-size: 14px;
    }
`

const LoginButton = styled.button`
    font-size: 14px;
    background-color: #384256;
    border: none;
    border-radius: 5px;
    color: white;
    width: 100%;
    max-width: 200px;
    height: 50px;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

const LoginErrorMessage = styled.p`
    color: red;
    margin: 0;
    font-size: 14px;
    align-items: flex-start;
`