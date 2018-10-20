import React, { Component } from 'react';
import styled from 'styled-components';

import ModalTitle from './ModalTitle';
import HalfAndHalf from '../../common/HalfAndHalf';
import Cursor from '../../styled/Cursor';

const Searching = styled.p`
    font-size: 20px;
    color: #fff;
    font-weight: 300;
    text-transform: capitalize;
    margin-top: 250px;
    text-align: center;
`;

class Multiplayer extends Component {
    state = {  }
    render() {
        return (
            <div>
                <ModalTitle text="multiplayer test" />
                <HalfAndHalf />
                <Searching>searching for opponent<Cursor color="#fff" fontSize="30px">...</Cursor></Searching>
            </div>
        );
    }
}

export default Multiplayer;