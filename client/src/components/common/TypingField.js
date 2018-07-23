import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TypingFieldContainer = styled.div`
    margin-top: 136px;
    width: 100%;
`;

class TypingField extends Component {
    state = {  }
    render() {
        return (
            <TypingFieldContainer>
                {this.props.passage}
            </TypingFieldContainer>
        );
    }
}

TypingField.propTypes = {
    passage: PropTypes.string.isRequired
};

export default TypingField;