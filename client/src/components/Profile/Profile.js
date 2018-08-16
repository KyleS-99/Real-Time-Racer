import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProfileContainer = styled.div`
    margin-top: 136px;
`;

class Profile extends Component {
    state = {  }
    render() {
        return (
            <ProfileContainer>
                <p>Profile component</p>
            </ProfileContainer>
        );
    }
}

export default Profile;