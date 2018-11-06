import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import ProgressBar from './ProgressBar';
import SmallSpinner from './SmallSpinner';

import GUID from '../../utils/keyGenerator';

const TypingFieldContainer = styled.div`
    margin-top: 136px;
    width: 100%;
    position: relative;
`;

const ProgressBarContainer = styled.div`
    width: 50%
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0 auto;
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
    display: ${props => props.count !== 0 ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    z-index: 100000;
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
    z-index: 10000;
    width: 80px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 12px;
    left: 50%;
    margin-left: -40px;

    @media(max-width: 500px) {
        top: 70px;
    }
`;

const Time = styled.p`
    text-align: center;
`;

const TypingContainer = styled.div`
    width: 60%;
    max-width: 1000px;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    width: 80%;
    padding: 15px 20px;
    margin-top: 20px;
    border: 1px solid #eee;
    font-size: 20px;
    font-weight: 300;
    box-shadow: 0px 8px 33px 0px rgba(0,0,0,0.1);
    outline: none;
    border-radius: 5px;
`;

const WordContainer = styled.div`
    text-align: center;
    font-size: 23px;
    line-height: 1.15;
    font-weight: 400;
    color: #555;
`;

const CurrentWord = styled.span`
    position: relative;

    &::before {
        ${props => props.text ? "content:" + `"${props.text.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&').replace(/\\([\s\S])|(")/g,"\\$1$2")}";` : null}
        position: absolute;
        bottom: 100%;
        white-space: nowrap;
        color: #f0f8ff;
        background: rgba(0, 0, 0, .8);
        padding: ${props => props.text && props.text !== '' ? "5px" : "0px"};
        height: ${props => props.text && props.text.includes(' ') ? "33px" : "auto"};
        width: ${props => props.text && props.text.includes(' ') ? "33px" : "auto"};
        box-sizing: border-box;
        border-radius: 5px;
        font-weight: 300;
        font-size: 20px;
        transition: 0.3s;
        ${props => props.wrong ? "text-decoration: line-through;" : null}
    }
`;

const Correct = styled.span`
    color: #17a589;
    transition: .5s;
`;

const Wrong = styled.span`
    background: hsla(6, 78%, 66%, .5);
    color: #b03a2e;
    transition: .2s;
`;

const Overlay = styled.div`
    ${props => props.raceDone ? 'position: absolute' : 'display: none'}
    ${props => props.raceDone ? 'top: 37vh' : null}
    ${props => props.raceDone ? 'bottom: 0' : null}
    ${props => props.raceDone ? 'left: 0' : null}
    ${props => props.raceDone ? 'right: 0' : null}
    ${props => props.raceDone ? 'background: rgba(255, 255, 255, .7)' : null}
`;

class TypingField extends Component {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();
        this.state = {
            total: 120,
            typingTime: 0,
            timeString: '2:00',
            startTimeDown: 5,
            text: '',
            passageArray: [],
            currentWord: [],
            finished: [],
            currentWordString: '',
            backspace: false,
            totalChars: 0,
            totalPassageChars: 0,
            percentComplete: 0,
            grossWPM: 0,
            errors: 0,
            acc: 0,
            first: '',
            last: ''
        }
    }
    countDown = () => {
        const timer = setInterval(() => {
            const total = this.state.total - 1;
            const typingTime = this.state.typingTime + 1.6666666666666667;

            this.setState({ total, typingTime });

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
                
                // Redirect user to /dashboard if they've not finished the race
                this.props.history.push('/dashboard');
            }

            this.setState({ timeString: `${minuteString}:${secondString}` });
        }, 1000)
    }
    tickDown = () => {
        const timer = setInterval(() => {
            const time = this.state.startTimeDown - 1;

            this.setState({ startTimeDown: time });

            // Check if time is 0 if so start the clock & clear interval
            if (time === 0) {
                this.countDown();
                if (this.inputRef && !this.cancelRequest) {
                    this.inputRef.current.focus();
                }
                return clearInterval(timer);
            }
        }, 1000);
    }
    timeDown = () => {
        console.log(this.props, this.props.isMultiplayer);
        setTimeout(() => {
            console.log(this.props, this.props.isMultiplayer);
            if (this.props.isMultiplayer) {
                this.socket.emit('ready');
            } else {
                this.tickDown();
            }
        }, 1000);
    }
    onPaste = (e) => {
        e.preventDefault();
    }
    onKeyDown = (e) => {
        e.persist();
        // Only change totalChars, and percentComplete if the value is correct and they're deleting
        if (e.keyCode === 8 && this.state.currentWordString.slice(0, e.target.value.length === 0 ? 1 : e.target.value.length) === e.target.value && (this.state.totalChars !== this.state.totalPassageChars)) {
            this.setState((prevState) => ({
                totalChars: this.state.totalChars - 1,
                percentComplete: (this.state.totalChars / this.state.totalPassageChars) * 100,
                backspace: e.keyCode === 8,
                grossWPM: (this.state.totalChars / 5) / this.state.typingTime * 100
            }));
        } else {
            // Otherwise set backspace to true or false depending on if it equals 8
            this.setState({ backspace: e.keyCode === 8 });
        }
    }
    onChange = (e) => {
        // Get value of input
        const value = e.target.value;
        // The current words value from state
        const currentWord = this.state.currentWordString;
        // Get length of the current value of the input field
        const length = value.length;
        // Grab the rest of the text from where user left off typing
        const rest = currentWord.slice(length);
        // Remove the word that was finished from the array
        const removedCurrent = this.state.passageArray.slice(1);
        // Create a string based on the length of the input field
        const match = currentWord.slice(0, length) === value

       // Prevent user from typing if race is over or if user enters space at the beginning
        if (value[0] === ' ' || this.state.totalChars === this.state.totalPassageChars) {
            return;
        }

        // If user types space test to see if it matches the current word
        // If so shift state
        if (value.slice(-1) === ' ' && match && currentWord.length === length) {
            return this.setState((prevState) => ({
                finished: [...prevState.finished, <Correct key={GUID()}>{currentWord}</Correct>],
                currentWord: [<CurrentWord key={GUID()}>{prevState.passageArray[0]}</CurrentWord>],
                currentWordString: prevState.passageArray[0],
                passageArray: removedCurrent,
                text: '',
                totalChars: prevState.totalChars + 1,
                grossWPM: (prevState.totalChars / 5) / prevState.typingTime * 100,
                acc: ((prevState.totalPassageChars - (prevState.errors)) / (prevState.totalPassageChars)) * 100
            }));
        }

        // Test individual character against regex if not a space
        if (match) {
            this.setState((prevState) => ({
                currentWord: [<CurrentWord key={GUID()} text={value}><Correct>{value}</Correct>{rest}</CurrentWord>],
                text: value,
                totalChars: !prevState.backspace ? prevState.totalChars + 1 : prevState.totalChars,
                grossWPM: (prevState.totalChars / 5) / prevState.typingTime * 100,
                percentComplete: !prevState.backspace ? (prevState.totalChars + 1) === prevState.totalPassageChars ? 100 : ((prevState.totalChars + 1) / prevState.totalPassageChars) * 100 : prevState.percentComplete,
                acc: !prevState.backspace ? ((prevState.totalPassageChars - (prevState.errors)) / (prevState.totalPassageChars)) * 100 : prevState.acc
            }));
            
            // Check if race is finished
            // Since setState is async test for +1 and ===
            if ((this.state.totalChars + 1) === this.state.totalPassageChars || this.state.totalChars === this.state.totalPassageChars) {
                // configure user data
                const { grossWPM, acc } = this.state;
                const userData = { grossWPM: Math.round(grossWPM), acc: Math.round(acc) };

                // Call parent component function with data
                return this.props.submitRaceData(userData);
            } else {
                return;
            }
        }

        // Error handling
        if (!match) {
            // init var
            let correctLength;

            // Loop through value, see at what length it isn't correct against the current word
            for(let i = 0; i < length; i++) {
                if (currentWord[i] !== value[i]) {
                    correctLength = i;
                    break;
                }
            }

            return this.setState((prevState) => ({
                currentWord: [
                    <CurrentWord key={value} text={value.slice(correctLength)} wrong={true}>
                        <Correct>{correctLength === 0 ? null : currentWord.slice(0, correctLength)}</Correct>
                        <Wrong>{currentWord[correctLength]}</Wrong>
                        {currentWord.slice(correctLength + 1)}
                    </CurrentWord>
                ],
                text: value.length === 0 && prevState.backspace ? '' : value,
                errors: !prevState.backspace ? prevState.errors + 1 : prevState.errors,
                acc: !prevState.backspace ? ((prevState.totalPassageChars - (prevState.errors + 1)) / (prevState.totalPassageChars)) * 100 : prevState.acc,
                grossWPM: (prevState.totalChars / 5) / prevState.typingTime * 100
            }));
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.passage !== this.props.passage) {
            this.setState({
                passageArray: this.props.passage.split(' ').map((word, index, arr) => {
                    if (index < arr.length) {
                        word += ' ';
                    }

                    if (index + 1 === arr.length) {
                        word = word.trim();
                    }

                    return word;
                }).slice(1),
                currentWord: [<CurrentWord key={GUID()}>{this.props.passage.split(' ')[0] + ' '}</CurrentWord>],
                currentWordString: this.props.passage.split(' ')[0] + ' ',
                totalPassageChars: this.props.passage.length
            });
        }
    }
    componentDidMount() {
        // Start time down
        this.timeDown();

        if (this.props.auth.user.first && !this.cancelRequest) {
            const { first, last } = this.props.auth.user;
            
            this.setState({ first, last });
        }

        // Initialize socket.io
        this.socket = io();
    }
    componentWillUnmount() {
        this.cancelRequest = true;

        this.socket.disconnect();
    }
    render() {
        const { 
            first, 
            last, 
            totalChars, 
            totalPassageChars,
            grossWPM,
            percentComplete
        } = this.state;
        const { user: { img } } = this.props.auth;

        return (
            <TypingFieldContainer>
                <Timer>
                    <Time>{this.state.timeString}</Time>
                </Timer>

                <ProgressBarContainer>
                    <ProgressBar 
                        wpm={Math.round(grossWPM)} 
                        percentComplete={percentComplete}
                        name={`${first} ${last}`}
                        img={img}
                    />

                    {
                        this.props.isMultiplayer && 
                        <ProgressBar 
                            name={this.props.opponent.opponentName} 
                            img={this.props.opponent.opponentImg} 
                        />
                    }
                </ProgressBarContainer>
                

                <StartTimerContainer count={this.state.startTimeDown}>
                    <StartTimer>
                        <TimeDown>{this.state.startTimeDown}</TimeDown>
                    </StartTimer>
                </StartTimerContainer>

                <TypingContainer>
                    <WordContainer>
                        {this.state.finished}{this.state.currentWord}{this.state.passageArray}
                    </WordContainer>
                    <Input 
                        placeholder="Type Here" 
                        onPaste={this.onPaste} 
                        onChange={this.onChange}
                        value={this.state.text}
                        name="text"
                        autoComplete="off"
                        onKeyDown={this.onKeyDown}
                        innerRef={this.inputRef}
                    />
                </TypingContainer>

                <Overlay raceDone={totalChars === totalPassageChars}>
                    <div style={{position: 'relative;'}}>
                        <SmallSpinner />
                    </div>
                </Overlay>
            </TypingFieldContainer>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(TypingField);