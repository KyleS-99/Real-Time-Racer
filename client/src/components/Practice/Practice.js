import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setPassage } from '../../actions/testActions';

import TypingField from '../common/TypingField';

class Practice extends Component {
    state = {
        passage: null
    }
    componentDidMount() {
        this.props.setPassage();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.passage !== this.props.test.passage) {
            this.setState({ passage: this.props.test.passage });
        }
    }
    render() {
        return (
            <div>
                <TypingField passage={this.state.passage} />
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