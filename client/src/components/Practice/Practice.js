import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setPassage } from '../../actions/testActions';

import TypingField from '../common/TypingField';

class Practice extends Component {
    state = {
        passage: null,
        passageId: null
    }
    submitRaceData = (userData) => {
        console.log(userData);
    }
    componentDidMount() {
        this.props.setPassage();
    }
    componentWillUnmount() {
        this.canceledRequest = true;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.passage !== this.props.test.passage && !this.canceledRequest) {
            const { passage, passageID } = this.props.test;

            // Set data to state
            this.setState({ passage, passageId });
        }
    }
    render() {
        return (
            <div>
                <TypingField passage={this.state.passage} submitRaceData={this.submitRaceData} />
            </div>
        );
    }
}

Practice.propTypes = {
    test: PropTypes.object.isRequired,
    setPassage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    test: state.test
});

export default connect(mapStateToProps, { setPassage })(Practice);