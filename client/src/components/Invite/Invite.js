import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import BackArrow from '../common/BackArrow';
import { setMultiplayerData } from '../../actions/testActions';
import { RESET_DATA } from '../../actions/types';

const InviteContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Share = styled.p`
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 700;
    color: #797d7f;
`;

const Url = styled.span`
    padding: 13px 15px;
    background: #eee;
    margin-top: 15px;
    font-size: 16px;
    cursor: copy;
    font-weight: 300;
`;

class Invite extends Component {
    constructor(props) {
        super(props);

        this.url = React.createRef();
        this.state = {
            opponentFound: false
        };
    }
    copy = () => {
        let range, selection;

        if (window.getSelection && document.createRange) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(this.url.current);
            selection.removeAllRanges();
            selection.addRange(range);
        } else if (document.selection && document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(this.url.current);
            range.select();
        }

        document.execCommand('copy');
    }
    componentDidMount() {
        const { socket } = this.props;

        this.props.dispatch({
            type: RESET_DATA
        });

        socket.connect();

        socket.on('connect', () => {
            socket.emit('private-race', { 
                room: this.props.match.params.room,
                name: `${this.props.auth.user.first} ${this.props.auth.user.last}`,
                img: this.props.auth.user.img ? this.props.auth.user.img : "https://i.imgur.com/O4mhvZf.png"
             });

             socket.on('opponent-joined', (data) => {
                this.setState({ opponentFound: true });
                this.props.dispatch(setMultiplayerData(data));
                setTimeout(() => {
                    this.props.history.push('/race');
                }, 500);
            });
        });
    }
    componentWillUnmount() {
        if (!this.state.opponentFound) {
            this.props.socket.disconnect();
        }
    }
    render() {
        return (
            <React.Fragment>
                <BackArrow />
                <InviteContainer>
                    <h1 style={{ textTransform: 'capitalize', fontSize: '25px', fontWeight: '300' }}>waiting for opponent</h1>
                    <Share>share this url</Share>
                    <Url 
                        innerRef={this.url}
                        onClick={this.copy}
                    >
                        {window.location.origin + '/invite/' + this.props.match.params.room}
                    </Url>
                </InviteContainer>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(mapStateToProps)(Invite);