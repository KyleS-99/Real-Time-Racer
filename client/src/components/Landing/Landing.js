import React, { Component } from 'react';
import styled from 'styled-components';

import Cursor from '../styled/Cursor';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';

const LandingContainer = styled.div`
    display: grid;
    grid-template-columns: 40% 60%;
    height: 100vh;
`;

const LogoContainer = styled.div`
    font-size: 2rem;
    text-align: center;
    margin-top: 5vh;
    margin-bottom: 5vh;
`;

const Logo = styled.span`
    font-weight: 300;
`;

const Left = styled.div`

`;

const Right = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    background: #ff0066;
    background-image: linear-gradient(135deg, rgba(255, 0, 102, 0.7) 0%, rgba(164, 69, 178, 0.7) 100%), url("https://i.imgur.com/RILc0Sw.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

const SignupFormContainer = styled.div`
    width: 80%;
    display: grid;
    justify-items: center;
    align-items: center;
    max-width: 430px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 20px 34px -4px;
    border: 1px solid #eee;
    padding-bottom: 1rem;
    transition: all ease-in-out 200ms;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 20px 34px -4px rgba(0,0,0,0.10);
    }
`;

const LoginFormContainer = SignupFormContainer.extend`
    margin-bottom: 7vh;
`;

const ColorBorder = styled.div`
    width: 100%;
    height: 5px;
    background-image: linear-gradient(-225deg, rgb(164, 69, 178), rgb(212, 24, 114) 52%, rgb(255, 0, 102));
    position: relative;
`;

const Blur = styled.div`
    z-index: 1;
    filter: blur(10px);
    width: 100%;
    height: 5px;
    background-image: linear-gradient(-225deg, rgb(164, 69, 178), rgb(212, 24, 114) 52%, rgb(255, 0, 102));
    position: relative;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 2.25rem 0 1rem 0;
`;

const SmallTitle = styled.p`
    background: transparent;
    color: #fff;
    font-size: 1.25rem;
    text-align: center;
`;

const FormDiv = styled.div`
    width: 80%;
`;

const Or = Title.extend`
    font-size: 1.7rem;
    margin: 3rem 0;
    position: relative;
`;

const BlockQuote = styled.blockquote`
    font-size: 2rem;
    color: #fff;
    background: transparent;
    text-align: center;

    &::before {
        content: open-quote;
    }

    &::after {
        content: close-quote;
    }
`;

const By = SmallTitle.extend`
    font-size: 1.5rem;
`;

class Landing extends Component {
    state = {

    }
    render() {
        return (
            <LandingContainer>
                <Left>
                    <LogoContainer>
                        <Logo>Real Time Racer.</Logo><Cursor fontSize="2.2rem">|</Cursor>
                    </LogoContainer>
                    
                    <SignupFormContainer>
                        <ColorBorder />
                        <Blur />
                        <Title>Sign Up</Title>
                        <FormDiv>
                            <Signup />
                        </FormDiv>
                    </SignupFormContainer>

                    <Or>
                        OR
                    </Or>

                    <LoginFormContainer>
                        <ColorBorder />
                        <Blur />
                        <Title>Login</Title>
                        <FormDiv>
                            <Login />
                        </FormDiv>
                    </LoginFormContainer>
                </Left>
                <Right>
                    <div style={{ background: 'transparent' }}>
                        <SmallTitle>Race against strangers or friends<Cursor color="#fff" fontSize="1.4rem">|</Cursor></SmallTitle>
                        <BlockQuote>
                            I'm great at fake typing but in real life terrible.
                        </BlockQuote>
                        <By>- Elden Henson</By>
                    </div>
                </Right>
            </LandingContainer>
        );
    }
}

export default Landing;