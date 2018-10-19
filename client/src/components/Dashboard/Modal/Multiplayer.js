import React, { Component } from 'react';
import styled from 'styled-components';

import ModalTitle from './ModalTitle';
import HalfAndHalf from '../../common/HalfAndHalf';

class Multiplayer extends Component {
    state = {  }
    render() {
        return (
            <div>
                <ModalTitle text="multiplayer test" />
                <HalfAndHalf />
            </div>
        );
    }
}

export default Multiplayer;