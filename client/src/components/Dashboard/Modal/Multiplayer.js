import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ModalTitle from './ModalTitle';
import HalfAndHalf from '../../common/HalfAndHalf';
import Cursor from '../../styled/Cursor';
import { setMultiplayerData } from '../../../actions/testActions';

const Searching = styled.p`
    font-size: 20px;
    color: #fff;
    font-weight: 300;
    text-transform: capitalize;
    margin-top: 250px;
    text-align: center;
`;

class Multiplayer extends Component {
    state = {
        opponentFound: false
    }
    componentDidMount() {
        if (!this.canceled) {
            const { socket } = this.props;

            if (socket.connected) {
                socket.emit('searching', {
                    name: `${this.props.auth.user.first} ${this.props.auth.user.last}`,
                    img: this.props.auth.user.img ? this.props.auth.user.img : "https://i.imgur.com/O4mhvZf.png"
                });

                socket.on('opponent-found', (data) => {
                    this.setState({ opponentFound: true });
                    this.props.dispatch(setMultiplayerData(data));
                    this.props.history.push('/race');
                });
            }

            socket.on('reconnect_attempt', attempt => {
                if (attempt > 4) {
                    socket.disconnect();
                }
            });
        }
    }
    componentWillUnmount() {
        this.canceled = true;

        if (!this.state.opponentFound) {
            this.props.socket.disconnect();
        }
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