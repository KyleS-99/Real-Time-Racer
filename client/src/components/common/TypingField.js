import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

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

    @media(max-width: 500px) {
        top: 70px;
    }
`;

const Time = styled.p`
    text-align: center;
`;

const TypingContainer = styled.div`
    width: 60%;
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
    font-size: 1.55rem;
    line-height: 1.15;
`;

const CurrentWord = styled.span`
    position: relative;

    &::before {
        content: "${props => props.text}";
        position: absolute;
        bottom: 100%;
        white-space: nowrap;
        color: #f0f8ff;
        background: rgba(0, 0, 0, .8);
        padding: ${props => props.text ? "5px;" : "0px;"}
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
`;

const Wrong = styled.span`
    background: hsla(6, 78%, 66%, .5);
    color: #b03a2e;
    transition: .2s;
`;

class TypingField extends Component {
    state = {
        total: 120,
        timeString: '2:00',
        startTimeDown: 6,
        text: '',
        passageArray: [],
        currentWord: [],
        finished: [],
        currentWordString: '',
        backspace: false
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
        }, 1000);
    }
    onPaste = (e) => {
        e.preventDefault();
    }
    onKeyDown = (e) => {
        this.setState({ backspace: e.keyCode === 8 });
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
        // Create a regex based on the length of the input field
        const newRegExp = new RegExp(currentWord.slice(0, length));

        if (value[0] === ' ') {
            return;
        }

        // If user types space test to see if it matches the current word
        // If so shift state
        if (value.slice(-1) === ' ' && newRegExp.test(value)) {
            return this.setState({
                finished: [...this.state.finished, <Correct key={currentWord}>{currentWord}</Correct>],
                currentWord: [<CurrentWord key={value}>{this.state.passageArray[0]}</CurrentWord>],
                currentWordString: this.state.passageArray[0],
                passageArray: removedCurrent,
                [e.target.name]: ''
            });
        }

        // Test individual character against regex if not a space
        if (newRegExp.test(value)) {
            this.setState({
                currentWord: [<CurrentWord key={value} text={value}><Correct>{value}</Correct>{rest}</CurrentWord>],
                text: value
            });
        }

        // Error handling
        if (!newRegExp.test(value)) {
            // init var
            let correctLength;

            // Loop through value, see at what length it isn't correct against the current word
            for(let i = 0; i < currentWord.slice(0, length).length; i++) {
                if (currentWord.slice(0, length)[i] !== value[i]) {
                    correctLength = i;
                    break;
                }
            }

            this.setState({
                currentWord: [
                    <CurrentWord key={value} text={value.slice(correctLength)} wrong={true}>
                        <Correct>{correctLength === 0 ? null : currentWord.slice(0, correctLength)}</Correct>
                        <Wrong>{currentWord[correctLength]}</Wrong>
                        {currentWord.slice(correctLength + 1)}
                    </CurrentWord>
                ],
                text: value.length === 0 && this.state.backspace ? '' : value
            });
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
                currentWord: [<CurrentWord key={this.props.passage.split(' ')[0]}>{this.props.passage.split(' ')[0] + ' '}</CurrentWord>],
                currentWordString: this.props.passage.split(' ')[0] + ' '
            });
        }
    }
    componentDidMount() {
        // Start time down
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
                    />
                </TypingContainer>
            </TypingFieldContainer>
        );
    }
}

export default TypingField;