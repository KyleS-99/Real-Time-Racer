import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const IndividualRace = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 140px;
    height: 140px;
    background: #fff;
    box-shadow: 0 9px 33px 0 rgba(0,0,0,.06);
    border-radius: 5px;
    margin: 6px;
    padding: 6px;
    
    & * {
        color: #696969;
        font-weight: 300;
    }

    &:hover {
        transform: translateY(-2px);
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 16px;
    text-transform: capitalize;

    &:hover {
        text-decoration: underline;
    }
`;

const WPM = styled.h1`
    font-size: 35px;
`;

const WPMWord = styled.span`
    font-size: 20px;
    text-transform: uppercase;
`;

const Accuracy = styled.h1`
    font-size: 20px;
`;

const AccuracySymbol = styled.span`
    font-size: 15px;
    text-transform: capitalize;
`;

const Race =({ id, wpm, accuracy }) => (
    <IndividualRace>
        <StyledLink to={`/tests/practice/${id}`}>view details</StyledLink>
        <WPM>{wpm} <WPMWord>wpm</WPMWord></WPM>
        <Accuracy>{accuracy}<AccuracySymbol>% Accuracy</AccuracySymbol></Accuracy>
    </IndividualRace>
);

Race.propTypes = {
    id: PropTypes.string.isRequired,
    wpm: PropTypes.number.isRequired,
    accuracy: PropTypes.number.isRequired
};

export default Race;