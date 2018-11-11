import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ProgressBarContainer = styled.div`
    height: 38vh;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    margin-top: 200px;
`;

const PlayerBackgroundFill = styled.div`
    background: rgba(254, 81, 150, 0.35);
    width: 180px;
    height: 100%;
`;

const Player = styled.div`
    position: relative;
    transition: .4s;
    height: ${props => props.percentComplete}%;
    top: -50px;
`;

const PlayerInfo = styled.div`
    padding: 8px;
    background: #fff;
    border-radius: 50px;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 14px;
    box-shadow: 0 11px 37px 0 rgba(0,0,0,.1);
    display: flex;
`;

const StatusBar = styled.div`
    position: absolute;
    margin: -80px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
`;

const Wpm = styled.span`
    font-size: 13px;
    font-weight: 300;
    color: #8d8d8d;
`;

const InfoP = styled.p`
    padding: 0px;
    margin: 0px;
`;

const PlayerName = styled.div`
    background: #fff;
    padding: 8px;
    margin: 0 auto;
    text-align: center;
    font-weight: 300;
    color: #8d8d8d;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    font-size: 15px;
    box-shadow: 0 11px 33px 0 rgba(0,0,0,.07);
    border: 1px solid #eee;
`;

const Name = styled.p`
    font-weight: bold;
    padding: 0;
    margin: 0;
`;

const ProfilePictureContainer = styled.div`
    width: 100%;
    position: absolute;
    z-index: 10;
`;

const ProfileLine = styled.div`
    width: 100%;
`;

const Line = styled.div`
    width: 100%;
    height: 5px;
    background-image: linear-gradient(0deg,#f77062 0,#fe5196);
`;

const LineBlur = Line.extend`
    filter: blur(10px);
`;

const ProfilePicture = styled.div`
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background-image: url(${props => props.src ? props.src : "https://i.imgur.com/O4mhvZf.png"});
    background-size: cover;
    background-position: center center;
    box-shadow: 0 8px 19px -1px rgba(0,0,0,.1);
    box-shadow: 0 4px 45px 0 rgba(0,0,0,.2);
    border: 5px solid #f77062;
    margin: -47px auto 0 auto;
`;

class ProgressBar extends Component {
    state = {
        wpm: 0,
        percentComplete: 0
    }
    componentDidUpdate(prevProps) {
        if ((prevProps.wpm !== this.props.wpm && prevProps.percentComplete !== this.props.percentComplete) && (this.props.percentComplete && this.props.wpm)) {
            this.setState({ wpm: this.props.wpm, percentComplete: this.props.percentComplete });
        }
    }
    render() {
        const { wpm, percentComplete } = this.state;
        return (
            <ProgressBarContainer>
                <Player percentComplete={percentComplete}>
                    <StatusBar>
                        <PlayerInfo>
                            <InfoP>
                                <strong>{wpm} </strong>
                                <Wpm>WPM</Wpm>
                            </InfoP>
                            &nbsp; | &nbsp;
                            <InfoP>
                                {Math.round(percentComplete)}%
                            </InfoP>
                        </PlayerInfo>
                    </StatusBar>
        
                    <PlayerBackgroundFill>
                        <ProfilePictureContainer>
                            <ProfileLine>
                                <Line />
                                <LineBlur />
                            </ProfileLine>
                            <ProfilePicture src={this.props.img} />
                        </ProfilePictureContainer>
                    </PlayerBackgroundFill>

                    <PlayerName>
                        <Name>{this.props.name}</Name>
                    </PlayerName>
                </Player>
            </ProgressBarContainer>
        );
    }
}

ProgressBar.propTypes = {
    wpm: PropTypes.number.isRequired,
    percentComplete: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
}

export default ProgressBar;