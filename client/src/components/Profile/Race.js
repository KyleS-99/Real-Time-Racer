import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { replayAction } from '../../actions/testActions';
import { RESET_REPLAY_DATA } from '../../actions/types';

class Race extends Component {
    state = {  }
    render() {
        return (
            <div></div>
        );
    }
}

Race.propTypes = {
    id: PropTypes.string.isRequired,
    wpm: PropTypes.number.isRequired,
    accuracy: PropTypes.number.isRequired
};

export default connect()(Race);