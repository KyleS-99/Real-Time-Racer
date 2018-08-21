import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

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

class Profile extends Component {
    state = {
        low: 0,
        avg: 0,
        high: 0
    }
    render() {
        // Users name and image
        const { user: { img, first, last }, method } = this.props.auth;
        // Typing data
        const { low, avg, high } = this.state;
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
                </ProfileInnerContainer>
            </ProfileContainer>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Profile);