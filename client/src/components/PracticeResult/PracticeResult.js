import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PracticeResultContainer = styled.div`
    width: 100%;
    margin-top: 80px;
`;

const PracticeResultInnerContainer = styled.div`
    width: 60%;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
`;

const Avatar = styled.div`
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border-radius: 50%;
    background-image: url(${props => props.src ? props.src : "https://i.imgur.com/O4mhvZf.png"});
    background-size: cover;
    background-position: center center;
    cursor: pointer;
`;

const MarginTopDiv = styled.div`
    margin-top: 20px;
`;

const Name = styled(Link)`
    color: #222;
    font-size: 35px;
    text-decoration: none;
`;

const Wpm = styled.p`
    color: #222;
    font-size: 25px;
`;

const Accuracy = styled.p`
    font-weight: 300;
`;

const AccuracyPercent = styled.span`
    font-weight: 300;
    padding: 5px;
    color: #1e1e1e;
    border-radius: 5px;
    background: #eee;
`;

const TextTyped = styled.div`
    font-size: 18px;
    font-weight: 300;
    line-height: 1.5;
`;

const Title = styled.h2`
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 300;
    margin-bottom: -20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-self: center;
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;
`;

const Replay = styled.button`
    margin-right: 15px;
    width: 150px;
    height: 40px;
    background-image: linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%);
    color: aliceblue;
    font-size: 18px;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: none;
    border-radius: 50px;
    box-shadow: 0px 15px 43px 0px rgba(212,24,114,0.3);
    outline: none;
    transition: 0.2s;
    cursor: pointer;

    &:active {
        transform: scale(0.9);
    }
`;

const AnotherTest = styled.button`
    height: 40px;
    outline: none;
    background: #fff;
    border: none;
    padding: 0px 25px;
    box-shadow: 0px 7px 60px -6px rgba(0,0,0,0.1);
    color: #707B7C;
    cursor: pointer;
    transition: 0.3s;

    &:active {
        opacity: 0.5;
        transform: scale(0.9);
    }
`;

class PracticeResult extends Component {
    state = {
        passage: null,
        passageId: null,
        wpm: null,
        accuracy: null,
        error: null,
        loading: true
    }
    onKeyDown = (e) => {
        // See if users is using IE9
        const eventObj = window.event ? window.event : e;

        // Check to see if user pressed ctrl + z
        if (eventObj.keyCode === 90 && eventObj.ctrlKey) {
            // Send them back to practice test
            this.props.history.push('/test/practice');
        }
    }
    componentDidMount() {
        // Add listener for keydown to see if user presses ctrl + z
        window.addEventListener('keydown', this.onKeyDown);

        // Make sure component hasn't been unmounted
        if (!this.canceled) {
            // Get the raceId from the params
            const { raceId } = this.props.match.params;

            // make GET request
            axios.get(`/tests/practice/${raceId}`)
                .then((res) => {
                    // since this is an async request 
                    // check to make sure that component has not been unmounted
                    // (don't create a memory leak)
                    if (!this.canceled) {
                        // Get data from response
                        const { id, accuracy, wpm, passage } = res.data;

                        // Set state
                        this.setState({
                            passage,
                            passageId: id,
                            accuracy,
                            wpm,
                            loading: false
                        });
                    }
                })
                .catch((err) => this.setState({
                    error: err.response.data.error,
                    loading: false
                }));
        }
    }
    componentWillUnmount() {
        this.canceled = true;

        // Remove event listener for keydown
        window.removeEventListener('keydown', this.onKeyDown);
    }
    render() {
        const { passage, wpm, accuracy, error, loading } = this.state;
        const { user: { img, first, last }, method } = this.props.auth;
        let enlargeImg;

        // Check if img is defined if so set enlargeImg to the url but add 200 as the size
        if (img && img !== '' && method === 'google') {
            enlargeImg = img.slice(0, -2) + '200';
        }

        // Init result variable
        let result;

        if (error === null && !loading) {
            result = (
                <PracticeResultContainer>
                    <PracticeResultInnerContainer>
                        <Avatar src={enlargeImg ? enlargeImg : img} />

                        <MarginTopDiv>
                            <Name to="/profile">
                                {`${first} ${last}`}
                            </Name>
                        </MarginTopDiv>

                        <MarginTopDiv>
                            <Wpm>
                                {wpm} WPM
                            </Wpm>
                        </MarginTopDiv>

                        <MarginTopDiv>
                            <Accuracy>
                                Accuracy <AccuracyPercent>{accuracy}%</AccuracyPercent>
                            </Accuracy>
                        </MarginTopDiv>

                        <MarginTopDiv>
                            <TextTyped>
                                <Title>text typed</Title>
                                <p>{passage}</p>
                            </TextTyped>
                        </MarginTopDiv>

                        <ButtonContainer>
                            <Replay>Replay</Replay>
                            <Link to="/test/practice">
                                <AnotherTest>
                                    Take Practice Test (Ctrl + z)
                                </AnotherTest>
                            </Link>
                        </ButtonContainer>
                    </PracticeResultInnerContainer>
                </PracticeResultContainer>
            );
        } else {
            result = (
                <PracticeResultContainer>
                    <h1>{error}</h1>
                </PracticeResultContainer>
            );
        }

        return result;
    }
}

PracticeResult.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PracticeResult);