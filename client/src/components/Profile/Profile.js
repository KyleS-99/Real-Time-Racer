import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';

import BackArrow from '../common/BackArrow';
import Race from './Race';
import Spinner from '../common/Spinner';

const ProfileContainer = styled.div`
    margin-top: 100px;
    width: 100%;
`;

const ProfileInnerContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

const StatsContainer = styled.div`
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;

        h1 {
            text-align: center;
        }
    }
`;

const Avatar = styled.div`
    max-width: 200px;
    min-width: 200px;
    max-height: 200px;
    min-height: 200px;
    border-radius: 50%;
    background-image: url(${props => props.src ? props.src : "https://i.imgur.com/O4mhvZf.png"});
    background-size: cover;
    background-position: center center;
    margin-top: 25px;
`;

const ProfileDetails = styled.div`
    width: 50%;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    @media (max-width: 768px) {
        align-items: center;
        margin-top: 10px;
    }
`;

const Name = styled.h1`
    font-size: 25px;
    font-weight: 300;
`;

const WPMContainer = styled.div`
    display: flex;
    margin-top: 20px;

    & div + div {
        margin-left: 8px;
    }
`;

const WPMBox = styled.div`
    background: #fff;
    width: 60px;
    height: 45px;
    padding: 3px 5px;
    border-radius: 2px;
    color: #7b7b7b;
    transition: .35s cubic-bezier(.4,0,.2,1);
    cursor: pointer;
    box-shadow: 0 0 51px 0 rgba(0,0,0,.08), 0 6px 18px 0 rgba(0,0,0,.0);

    &:hover {
        transform: translateY(-2px);
    }
`;

const Info = styled.p`
    font-size: 10px;
    margin: 0;
    text-align: ${props => props.left ? 'left' : 'right'};
    padding: 1px;
    text-transform: uppercase;
    font-weight: 300;
`;

const WPMData = styled.p`
    margin: 0;
    text-align: center;
    font-size: 18px;
`;

const RaceDataContainer = styled.div`
    max-width: 1200px;
    margin: 25px auto 0 auto;
`;

const Menu = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 5px;

    & p + p {
        margin-left: 15px;
    }
`;

const MenuItem = styled.p`
    padding: 8px 15px;
    text-transform: uppercase;
    border-radius: 50px;
    font-size: 14px;
    color: #a3a3a3;
    transition: .2s;
    ${props => props.active ? 'background: #eee;' : null}

    &:hover {
        background: #eee;
        cursor: pointer;
    }
`;

const Races = styled.div`
    width: 80%;
    max-width: 1200px;
    margin: 50px auto 0 auto;
    display: flex;
    justify-content: center;
    padding-bottom: 100px;
    flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
    max-width: 1200px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${props => props.loading ? 'margin: 25px auto 10vh auto' : 'margin: -35px auto 10vh auto'};
`;

const Button = styled.button`
    padding: 10px 25px;
    background: #eee;
    border: none;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    outline: none;
    border-radius: 5px;
    color: #2C3E50;
    box-shadow: 0px 7px 45px -8px rgba(212,212,212,0.2);
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.9);
    }

    &:disabled {
        opacity: 0.5;
    }
`;

class Profile extends Component {
    state = {
        low: 0,
        avg: 0,
        high: 0,
        both: true,
        practice: false,
        player: false,
        loading: true,
        prev: 'both',
        current: 'both',
        practiceTotal: 0,
        playerTotal: 0,
        total: 0,
        bothRequest: 15,
        practiceRequest: 15,
        playerRequest: 15,
        disabled: false,
        practiceRaces: [],
        playerRaces: [],
        all: [],
        errors: null
    }
    toggleActiveMenu = (makeActive) => {
        this.setState((prevState) => ({
            [prevState.prev]: false,
            prev: makeActive,
            [makeActive]: true,
            current: makeActive
        }));

        // Set vars
        const {
            practiceRaces,
            playerRaces,
            bothRequest,
            practiceRequest,
            playerRequest
        } = this.state;

        // Check to see if length of array is 0 if so make the network request
        if (makeActive === 'player' && playerRaces.length === 0) {
            // Make sure component is not being unmounted before making request
            if (!this.unmounted) {
                // Set loading to true
                this.setState({ loading: true });

                // Make request
                axios
                    .get('tests/all?type=player')
                    .then(res => {
                        // Get data off of object
                        const { playerRaces } = res.data;
                        
                        // Only set state if component is not being unmounted
                        if (!this.unmounted) {
                            this.setState(prevState => ({
                                loading: false,
                                playerRaces: playerRaces.map(({ wpm, accuracy, _id }) => <Race id={_id} wpm={wpm} accuracy={accuracy} key={_id} />),
                                playerRequest: prevState.playerRequest + 15
                            }));
                        }
                    })
                    .catch((e) => {
                        if (!this.umounted) {
                            this.setState({
                                errors: 'Unable to fetch any races at this time. Please try again later.',
                                loading: false
                            });
                        }   
                    });
            }
        } else if (makeActive === 'practice' && practiceRaces.length === 0) {
            // Make sure component is not being unmounted before making request
            if (!this.unmounted) {
                // Set loading to true
                this.setState({ loading: true });

                // Make request
                axios
                    .get('tests/all?type=practice')
                    .then(res => {
                        // Get data off of object
                        const { practiceRaces } = res.data;
                        
                        // Only set state if component is not being unmounted
                        if (!this.unmounted) {
                            this.setState(prevState => ({
                                loading: false,
                                practiceRaces: practiceRaces.map(({ wpm, accuracy, _id }) => <Race id={_id} wpm={wpm} accuracy={accuracy} key={_id} />),
                                practiceRequest: prevState.practiceRequest + 15
                            }));
                        }
                    })
                    .catch((e) => {
                        if (!this.unmounted) {
                            this.setState({
                                errors: 'Unable to fetch any races at this time. Please try again later.',
                                loading: false
                            });
                        }
                    });
            }
        }
    }
    componentDidMount() {
        // don't make request if component is going to be unmounted
        if (!this.unmounted) {
            axios
                .get('/tests/all')
                .then((res) => {
                    // Pull data off of object
                    const {
                        all,
                        total,
                        practiceTotal,
                        playerTotal,
                        low,
                        avg,
                        high
                    } = res.data;

                    // Check to see if component is not being umounted
                    if (!this.unmounted) {
                        this.setState({
                            low,
                            avg,
                            high,
                            practiceTotal,
                            playerTotal,
                            total,
                            loading: false,
                            all: all.map(({ wpm, accuracy, _id }) => <Race id={_id} wpm={wpm} accuracy={accuracy} key={_id} />)
                        });
                    }
                })
                .catch((e) => 
                    this.setState({ 
                        errors: 'Unable to fetch any races at this time. Please try again later.',
                        loading: false 
                    })
                );
        }
    }
    componentWillUnmount() {
        this.unmounted = true;
    }
    render() {
        // Users name and image
        const { user: { img, first, last }, method } = this.props.auth;
        // Typing data
        const { low, avg, high, all, practice, player, both, practiceTotal, playerTotal, total, disabled, loading, practiceRaces, playerRaces } = this.state;
        // Enlarge image
        let enlargeImg;
        // Create full name from the 2 variables
        const fullName = `${first} ${last}`;

        // Check if img is defined if so set enlargeImg to the url but add 200 as the size
        if (img && img !== '' && method === 'google') {
            enlargeImg = img.slice(0, -2) + '200';
        }

        return (
            <ProfileContainer>
                <BackArrow />
                <ProfileInnerContainer>
                    <StatsContainer>
                        <Avatar src={enlargeImg ? enlargeImg : img} />

                        <ProfileDetails>
                            <Name>
                                {fullName}
                            </Name>

                            <WPMContainer>
                                <WPMBox>
                                    <Info left={true}>low</Info>
                                    <WPMData>{low}</WPMData>
                                    <Info>wpm</Info>
                                </WPMBox>
                                
                                <WPMBox>
                                    <Info left={true}>avg</Info>
                                    <WPMData>{avg}</WPMData>
                                    <Info>wpm</Info>
                                </WPMBox>
                                
                                <WPMBox>
                                    <Info left={true}>high</Info>
                                    <WPMData>{high}</WPMData>
                                    <Info>wpm</Info>
                                </WPMBox>
                            </WPMContainer>
                        </ProfileDetails>
                    </StatsContainer>

                    <RaceDataContainer>
                        <Menu>
                            <MenuItem active={both} onClick={() => {
                                this.toggleActiveMenu('both')
                            }}>
                                all tests ({total})
                            </MenuItem>

                            <MenuItem active={practice} onClick={() => {
                                this.toggleActiveMenu('practice')
                            }}>
                                practice tests ({practiceTotal})
                            </MenuItem>

                            <MenuItem active={player} onClick={() => {
                                this.toggleActiveMenu('player')
                            }}>
                                multiplayer tests ({playerTotal})
                            </MenuItem>
                        </Menu>
                    </RaceDataContainer>

                    <Races>
                        {loading && <Spinner />}
                        {both && all}
                        {practice && practiceRaces}
                        {player && playerRaces}
                    </Races>

                    <ButtonContainer loading={loading}>
                        <Button type="button" disabled={disabled || loading}>load more</Button>
                    </ButtonContainer>
                </ProfileInnerContainer>
            </ProfileContainer>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

Profile.propTypes = {
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Profile);