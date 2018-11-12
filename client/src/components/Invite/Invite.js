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
    padding: 5px 15px;
    background: #eee;
    margin-top: 15px;
    font-size: 16px;
    cursor: copy;
    font-weight: 300;
`;

class Invite extends Component {
    state = {
        opponentFound: false
    }
    render() {
        return (
            <React.Fragment>
                <BackArrow />
                <InviteContainer>
                    <h1 style={{ textTransform: 'capitalize', fontSize: '25px', fontWeight: '300' }}>waiting for other players</h1>
                    <Share>share this url</Share>
                    <Url>{window.location.origin + '/' + this.props.match.params.room}</Url>
                </InviteContainer>
            </React.Fragment>
        );
    }
}

export default Invite;