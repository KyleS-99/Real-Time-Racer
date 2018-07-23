import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const TypingFieldContainer = styled.div`
    margin-top: 136px;
    width: 100%;
`;

const bounce = keyframes`
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(-15px);
    }
`;

const StartTimerContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    display: ${props => props.count !== 0 ? 'flex;' : 'none;'}
    justify-content: center;
    align-items: center;
    z-index: 5;
`;

const StartTimer = styled.div`
    width: 150px;
    height: 150px;
    background: rgba(0,0,0,0.5);
    border-radius: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${bounce} 0.5s infinite alternate;
`;

const TimeDown = styled.p`
    font-size: 3rem;
    color: #f0f0f0;
`;

const Timer = styled.div`
    background-image: linear-gradient(-225deg,#a445b2,#d41872 52%,#f06);
    color: #f0f8ff;
    border-radius: 5px;
    position: fixed;
    z-index: 10;
    width: 80px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 12px;
    left: 50%;
    margin-left: -40px;
`;

const Time = styled.p`
    text-align: center;
`;

class TypingField extends Component {
    state = {
        total: 120,
        timeString: '2:00',
        startTimeDown: 6
    }
    countDown = () => {
        const timer = setInterval(() => {
            const total = (this.state.total - 1);
            this.setState({ total });

            // Calculations
            const minutes = Math.floor(total / 60);
            const seconds = total % 60;
            let minuteString = minutes.toString();
            let secondString = seconds.toString();

            // Add a 0 if less than 10
            if (seconds < 10) {
                secondString = `0${secondString}`;
            }
            
            // if total is 0 set the time to 0 & clear interval
            if (total === 0) {
                this.setState({ timeString: '0:00' });
                clearInterval(timer);
            }

            // Update state
            this.setState({ timeString: `${minuteString}:${secondString}` });
        }, 1000)
    }
    timeDown = () => {
        const timer = setInterval(() => {
            // Set the time - 1
            const time = this.state.startTimeDown - 1;

            // Update state
            this.setState({ startTimeDown: time });

            // Check if time is 0 if so start the clock & clear interval
            if (time === 0) {
                this.countDown();
                return clearInterval(timer);
            }
        }, 1000)
    }
    componentDidMount() {
        this.timeDown();
    }
    render() {
        return (
            <TypingFieldContainer>
                <Timer>
                    <Time>{this.state.timeString}</Time>
                </Timer>

                <StartTimerContainer count={this.state.startTimeDown}>
                    <StartTimer>
                        <TimeDown>{this.state.startTimeDown}</TimeDown>
                    </StartTimer>
                </StartTimerContainer>
            </TypingFieldContainer>
        );
    }
}

TypingField.propTypes = {
    passage: PropTypes.string.isRequired
};

export default TypingField;