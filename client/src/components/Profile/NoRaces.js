import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Description = styled.h1`
    font-weight: 300;
    font-size: 25px;
    text-transform: capitalize;
`;

const StyledLink = styled(Link)`
    color: #000;
    font-weight: 300;
    font-size: 25px;
    text-decoration: underline;
`;

const NoRaces = () => (
    <Description>
        no races found. <StyledLink to="/race">click here to play</StyledLink>
    </Description>
);

export default NoRaces;