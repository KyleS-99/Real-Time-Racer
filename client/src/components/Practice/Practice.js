import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setPassage, savePracticeRace } from '../../actions/testActions';

import TypingField from '../common/TypingField';

class Practice extends Component {
    state = {
        passage: null,
        passageId: null
    }
    submitRaceData = (userData) => {
        // Set passageId in object to be submited
        userData.passageId = this.state.passageId;

        // Make request
        this.props.savePracticeRace(userData, this.props.history);
    }
    componentDidMount() {
        // Get data from props
        const { replay, replayId, replayPassage } = this.props.test;
        
        // Check to see if user is wanting to replay certian passage
        if (replay) {
            this.setState({
                passage: replayPassage,
                passageId: replayId
            });
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
        return (
            <div>
                <TypingField 
                    passage={this.state.passage} 
                    submitRaceData={this.submitRaceData} 
                    history={this.props.history}
                />
            </div>
        );
    }
}

Practice.propTypes = {
    test: PropTypes.object.isRequired,
    setPassage: PropTypes.func.isRequired,
    savePracticeRace: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    test: state.test
});

export default connect(mapStateToProps, { setPassage, savePracticeRace })(Practice);