import React, { Component } from 'react';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signupOrLogin } from '../../actions/authActions';

import Cursor from '../styled/Cursor';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';

const LandingContainer = styled.div`
    display: grid;
    grid-template-columns: 40% 60%;
    height: 100vh;

    @media (max-width: 768px) {
        grid-template-columns: 100%;
    }
`;

const Left = styled.div`
    background: #fff;
    padding-top: 40px;
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

    @media (max-width: 768px) {
        grid-row-start: 1;
        height: 60vh;
        max-height: 600px;
    }
`;

const SignupFormContainer = styled.div`
    width: 80%;
    display: grid;
    justify-items: center;
    align-items: center;
    max-width: 430px;
    margin: 0 auto;
    background: #fff;
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

const FacebookButton = styled.button`
    flex-basis: 100%
    background: #3b5998;
    box-shadow: 0px 12px 35px -9px rgba(59,89,152,.4);
    color: #fff;
    border-radius: 2px;
    border: 0;
    outline: 0;
    padding: 10px 0px;
    margin-left: 10px;
    font-weight: 300;
    transition: all 100ms ease-in-out;
    cursor: pointer;

    &:hover {
        transform: translateY(0.5px);
        box-shadow: 0px 12px 35px -9px rgba(59,89,152,0.4);
        opacity: 0.8;
    }

    @media (max-width: 850px) {
        width: 100%;
    }
`;

const Google = styled(GoogleLogin)`
    flex-basis: 100%
    background: #dd4b39;
    box-shadow: 0px 12px 35px -9px rgba(221,75,57,1);
    color: #fff;
    border-radius: 2px;
    border: 0;
    outline: 0;
    padding: 10px 0px;
    font-weight: 300;
    transition: all 100ms ease-in-out;
    cursor: pointer;

    &:hover {
        transform: translateY(0.5px);
        box-shadow: 0px 12px 35px -9px rgba(221,75,57,0.4);
        opacity: 0.8;
    }

    @media (max-width: 850px) {
        width: 100%;
    }
`;

const OAuthContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2vh;

    @media (max-width: 850px) {
        flex-wrap: wrap;

        & button + button {
            margin: 15px 0;
        }
    }
`;

class Landing extends Component {
    state = {
        redirect: false
    }
    responseFacebook = response => {
        const { accessToken } = response;
        this.props.signupOrLogin({ access_token: accessToken }, 'users/oauth/facebook', this.props.history);
    }
    responseGoogle = response => {
        const { accessToken } = response;
        this.props.signupOrLogin({ access_token: accessToken }, 'users/oauth/google', this.props.history);
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    render() {
        return (
            <LandingContainer>
                <Left>
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

                    <SignupFormContainer>
                        <ColorBorder />
                        <Blur />
                        <Title>Login</Title>
                        <FormDiv>
                            <Login />
                            <OAuthContainer>
                                <Google
                                    clientId="475707192337-0fom7s274iocogh9drql9vloohrqv25n.apps.googleusercontent.com"
                                    buttonText="Google"
                                    onSuccess={this.responseGoogle}
                                />
                                <FacebookLogin
                                    appId="1903089829756150"
                                    fields="name,email,picture"
                                    callback={this.responseFacebook} 
                                    scope="public_profile"
                                    render={({...props}) => (<FacebookButton {...props}>Facebook</FacebookButton>)}
                                />
                            </OAuthContainer>
                        </FormDiv>
                    </SignupFormContainer>
                </Left>
                <Right>
                    <div style={{ background: 'transparent' }}>
                        <SmallTitle>Race against strangers or friends.<Cursor color="#fff" fontSize="1.4rem">|</Cursor></SmallTitle>
                        <BlockQuote>
                            I'm great at fake typing, but in real life terrible.
                        </BlockQuote>
                        <By>- Elden Henson</By>
                    </div>
                </Right>
            </LandingContainer>
        );
    }
}

Landing.propTypes = {
    signupOrLogin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { signupOrLogin })(Landing);