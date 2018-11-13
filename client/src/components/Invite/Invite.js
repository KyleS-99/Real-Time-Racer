import React, { Component } from 'react';
import styled from 'styled-components';
import BackArrow from '../common/BackArrow';

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
                        {window.location.origin + '/' + this.props.match.params.room}
                    </Url>
                </InviteContainer>
            </React.Fragment>
        );
    }
}

export default Invite;