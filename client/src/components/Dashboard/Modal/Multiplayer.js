import React, { Component } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';

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
    componentDidMount() {
        if (!this.canceled) {
            const socket = io();

            socket.on('connect', () => {
                console.log('Connected to server');

                socket.emit('searching', {
                    name: `${this.props.auth.user.first} ${this.props.auth.user.last}`,
                    img: this.props.auth.user.img ? this.props.auth.user.img : "https://i.imgur.com/O4mhvZf.png"
                });

                socket.on('opponent-found', (data) => {
                    console.log(data);
                });
            });

            socket.on('reconnect_attempt', attempt => {
                if (attempt > 4) {
                    socket.disconnect();
                }
            });

            socket.on('disconnect', () => {
                console.log('socket disconnected');
            });
        }
    }
    componentWillUnmount() {
        this.canceled = true;
    }
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

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(mapStateToProps)(Multiplayer);