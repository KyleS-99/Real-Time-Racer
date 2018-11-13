import React from 'react';
import SocketContextConsumer from '../common/SocketContextConsumer';
import Invite from './Invite';

const InviteContainer = (props) => (
    <SocketContextConsumer render={(socket) => <Invite socket={socket} match={props.match} history={props.history} />} />
);

export default InviteContainer;