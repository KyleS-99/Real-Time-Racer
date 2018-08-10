import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const OverviewContainer = styled.div`
    width: 100%;
    margin-top: 80px;
`;

const OverviewInnerContainer = styled.div`
    width: 60%;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
`;

const Avatar = styled.div`
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border-radius: 50%;
    background-image: url(${props => props.src ? props.src : "https://i.imgur.com/O4mhvZf.png"});
    background-size: cover;
    background-position: center center;
    cursor: pointer;
`;

const NameContainer = styled.div`
    margin-top: 20px;
`;

const Name = styled(Link)`
    color: #222;
    font-size: 35px;
    text-decoration: none;
`;

class Overview extends Component {
    state = {  }
    render() {
        const { user: { img, first, last }, method } = this.props.auth;
        let enlargeImg;

        // Check if img is defined if so set enlargeImg to the url but add 200 as the size
        if (img) {
            enlargeImg = img.slice(0, -2) + '200';
        }

        return (
            <OverviewContainer>
                <OverviewInnerContainer>
                    <Avatar src={enlargeImg} />

                    <NameContainer>
                        <Name to="/profile">
                            {`${first} ${last}`}
                        </Name>
                    </NameContainer>
                </OverviewInnerContainer>
            </OverviewContainer>
        );
    }
}

Overview.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Overview);