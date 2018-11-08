import React from 'react';
import SocketContext from '../../socket-context';

const SocketContextConsumer = props => {
    return (
        <SocketContext.Consumer>
            {socket => {
                return props.render(socket);
            }}
        </SocketContext.Consumer>
    );
}

export default SocketContextConsumer;