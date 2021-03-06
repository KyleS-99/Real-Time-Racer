import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setPassage, savePracticeRace, saveMultiplayerRace, setCustomWPMAndAccuracy } from '../../actions/testActions';
import SocketContextConsumer from '../common/SocketContextConsumer';
import TypingField from '../common/TypingField';

class Practice extends Component {
    state = {
        passage: null,
        passageId: null,
        opponentImg: null,
        opponentName: null,
        multiplayer: null,
        uniqueKey: null,
        opponentId: null
    }
    submitRaceData = (userData) => {
        // If custom is true then set the data and redirect to /tests/result
        if (this.props.test.custom) {
            // Get race data
            const { grossWPM, acc } = userData;

            return this.props.setCustomWPMAndAccuracy(grossWPM, acc, this.props.history);
        }

        // Set passageId in object to be submited
        userData.passageId = this.state.passageId;

        if (this.props.test.multiplayer && !this.canceledRequest) {
            return this.props.saveMultiplayerRace(userData, this.props.history);
        }

        // Make request
        if (!this.canceledRequest) {
            this.props.savePracticeRace(userData, this.props.history);
        }
    }
    componentDidMount() {
        // Get data from props
        const { replay, replayId, replayPassage, custom, customPassage, multiplayer, multiplayerPassage, multiplayerPassageId, opponentName, opponentImg, uniqueKey, opponentId } = this.props.test;
        
        // Check what user is doing - set state accordingly
        if (replay) {
            this.setState({
                passage: replayPassage,
                passageId: replayId
            });
        } else if (multiplayer) {
            this.setState({
                passage: multiplayerPassage,
                passageId: multiplayerPassageId,
                opponentName,
                opponentImg,
                multiplayer,
                uniqueKey,
                opponentId
            });
        } else if (custom) {
            this.setState({ passage: customPassage });
        } else {
            this.props.setPassage();
        }
    }
    componentWillUnmount() {
        this.canceledRequest = true;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.passage !== this.props.test.passage && !this.canceledRequest) {
            const { passage, passageId } = this.props.test;

            // Set data to state
            this.setState({ passage, passageId });
        }
    }
    render() {
        const { passage, multiplayer, opponentName, opponentImg, uniqueKey, opponentId } = this.state;
        
        return (
            <div>
                <SocketContextConsumer 
                    render={socket => {
                        return (
                            <TypingField 
                                passage={passage} 
                                submitRaceData={this.submitRaceData} 
                                history={this.props.history}
                                isMultiplayer={multiplayer}
                                opponent={{ opponentName, opponentImg }}
                                socket={socket}
                                room={uniqueKey}
                                opponentId={opponentId}
                            />
                        );
                    }} 
                />
            </div>
        );
    }
}

Practice.propTypes = {
    test: PropTypes.object.isRequired,
    setPassage: PropTypes.func.isRequired,
    savePracticeRace: PropTypes.func.isRequired,
    saveMultiplayerRace: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    test: state.test
});

export default connect(mapStateToProps, { setPassage, savePracticeRace, saveMultiplayerRace, setCustomWPMAndAccuracy })(Practice);