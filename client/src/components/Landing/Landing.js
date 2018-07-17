import React, { Component } from 'react';
import styled from 'styled-components';

import Cursor from '../common/Logo';
import Signup from '../Auth/Signup';

const LandingContainer = styled.div`
    display: grid;
    grid-template-columns: 35% 65%;
    height: 100vh;
`;

const LargeCursor = styled(Cursor)`
    font-size: 2.2rem;
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
    background: pink;
`;

const SignupContainer = styled.div`
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

const SignupTitle = styled.h2`
    text-align: center;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 2.25rem 0 1rem 0;
`;

const ShrinkSignup = styled.div`
    width: 80%;
`;

const Or = SignupTitle.extend`
    
`;

class Landing extends Component {
    state = {

    }
    render() {
        return (
            <LandingContainer>
                <Left>
                    <LogoContainer>
                        <Logo>Real Time Racer.</Logo><LargeCursor>|</LargeCursor>
                    </LogoContainer>
                    
                    <SignupContainer>
                        <ColorBorder />
                        <Blur />
                        <SignupTitle>Sign Up</SignupTitle>
                        <ShrinkSignup>
                            <Signup />
                        </ShrinkSignup>
                    </SignupContainer>
                    <Or />
                </Left>
                <Right>
                    Right
                </Right>
            </LandingContainer>
        );
    }
}

export default Landing;