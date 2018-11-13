import React from 'react';
import SocketContextConsumer from '../common/SocketContextConsumer';
import Invite from './Invite';

const InviteContainer = () => (
    <SocketContextConsumer render={(socket) => <Invite socket={socket} />} />
);

export default InviteContainer;