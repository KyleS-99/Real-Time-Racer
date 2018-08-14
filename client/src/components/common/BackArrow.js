import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BackArrowContainer = styled.div`
    position: absolute;
    top: 10vh;
    left: 7vw;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 1000;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
`;

const BackArrow = () => (
    <Link to="/dashboard">
        <BackArrowContainer>
            <Img src={window.location.origin + '/img/back-arrow.png'} />
        </BackArrowContainer>
    </Link>
);

export default BackArrow;