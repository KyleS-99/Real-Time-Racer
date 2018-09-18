import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import onClickoutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/authActions';

import Cursor from '../styled/Cursor';

const Header = styled.header`
    box-shadow: 0 7px 19px 0 rgba(0,0,0,.01);
    border-bottom: 1px solid #eee;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10000;
`;

const Nav = styled.nav`
    display: grid;
    grid-template-areas: "logo . . . . . avatar";
    grid-template-rows: 55px;
    justify-items: center;
    align-items: center;
    background: #fff;
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    font-size: 1.2rem;
`;

const Logo = styled.p`
    color: #000;
    grid-area: logo;
`;

const Avatar = styled.div`
    grid-area: avatar;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(${props => props.src ? props.src : "https://i.imgur.com/O4mhvZf.png"});
    background-size: cover;
    background-position: center center;
    box-shadow: 0 8px 19px -1px rgba(0,0,0,.1);
    cursor: pointer;
    position: relative;

    &:active {
        transition-duration: .2s;
        transform: scale(.9);
    }

    &::after {
        ${(props) => { if (props.display) return "content: '';" } }
        position: absolute;
        width: 30px;
        height: 30px;
        background: #000;
        top: 120%;
        left: 50%;
        margin-left: -15px;
        transform: rotate(45deg);
    }

    &::before {
        content: ${({first, last}) => `"${first} ${last}";` }
        margin-right: 10px;
        color: #000;
        font-weight: 300;
        font-size: 1.125rem;
        position: absolute;
        right: 100%;
        width: max-content;
        line-height: 41px;
    }

    @media (max-width: 500px) {
        &::before {
            width: initial;
            line-height: initial;
        }
    }
`;

const DropDownContainer = styled.div`
    position: absolute;
    visibility: ${(props) => props.display ? 'visible;' : 'hidden;'}
    top: 65px;
    right: 2%;
    border-radius: 3px;
    width: 150px;
    height: auto;
    background: #000;
    display: flex;
    flex-direction: column;
`;

const StyledLink = styled(Link)`
    color: #fff;
    font-size: 1.05rem;
    text-decoration: none;
    font-weight: 300;
    padding: 10px;
    transition: .2s;

    &:hover {
        cursor: pointer;
        border-left: 5px solid #fff;
    }
`;

class Navbar extends Component {
    constructor() {
        super();

        this.state = { 
            dropDown: false
        };
    }
    toggleDropDown = () => {
        // Toggle dropdown menu
        this.setState({ dropDown: !this.state.dropDown });
    }
    handleClickOutside = e => {
        if (this.state.dropDown) {
            this.setState({ dropDown: false });
        }
    }
    dropDownClicked = () => {
        this.setState({ dropDown: false });
    }
    render() {
        return (
            <Header>
                <Nav>
                    <StyledNavLink to="/dashboard">
                        <Logo>Real Time Racer.<Cursor>|</Cursor></Logo>
                    </StyledNavLink>
                    <Avatar 
                        src={this.props.auth.user.img} 
                        onClick={this.toggleDropDown}
                        display={this.state.dropDown}
                        first={this.props.auth.user.first}
                        last={this.props.auth.user.last}
                    />
                </Nav>
                <DropDownContainer 
                    display={this.state.dropDown}
                    ref={this.dropDownRef}
                >
                    <StyledLink to="/profile" onClick={this.dropDownClicked}>
                        Profile
                    </StyledLink>
                    <StyledLink to="#" onClick={() => {
                        this.props.logoutUser(this.props.history);
                    }}>
                        Logout
                    </StyledLink>
                </DropDownContainer>
            </Header>
        );
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(onClickoutside(Navbar));