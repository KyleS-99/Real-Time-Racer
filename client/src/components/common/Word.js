import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SingleWord = styled.p`
    font-size: 1.55rem;
`;

const Word = (props) => (
    <SingleWord>{props.word}</SingleWord>
);

Word.propTypes = {
    word: PropTypes.string.isRequired
};

export default Word;