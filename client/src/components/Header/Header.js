import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

import Cursor from '../common/Logo';

const Header = styled.header`
    box-shadow: 0 7px 19px 0 rgba(0,0,0,.01);
    border-bottom: 1px solid #eee;
`;

const Nav = styled.nav`
    display: grid;
    grid-template-areas: "logo . . . . . avatar";
    grid-template-rows: 55px;
    justify-items: center;
    align-items: center;
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
    background-image: url(${props => props.src ? props.src : ''});
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
`;

const DropDownContainer = styled.div`
    position: absolute;
    visibility: ${(props) => props.display ? 'visible' : 'hidden'};
    top: 65px;
    right: 2%;
    border-radius: 3px;
    width: 150px;
    height: auth;
    background: #000;
    padding: 8px;

    & a + a {
        margin-top: 8px;
    }
`;

const StyledLink = styled(Link)`
    color: #fff;
    font-size: 1.05rem;
    text-decoration: none;
    font-weight: 300;
    display: block;
`;

class Navbar extends Component {
    constructor() {
        super();

        this.state = { 
            dropDown: false
        };
        this.dropDownRef = React.createRef();
    }
    toggleDropDown = () => {
        // Toggle dropdown menu
        this.setState({ dropDown: !this.state.dropDown });
    }
    render() {
        return (
            <Header>
                <Nav>
                    <StyledNavLink to="/dashboard">
                        <Logo>Real Time Racer.<Cursor>|</Cursor></Logo>
                    </StyledNavLink>
                    <Avatar 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d43ec18ec2cf6ff854513b9e8395c1e&auto=format&fit=crop&w=1350&q=80" 
                        onClick={this.toggleDropDown}
                        display={this.state.dropDown}
                        onBlur={this.toggleDropDown}
                    />
                </Nav>
                <DropDownContainer 
                    display={this.state.dropDown}
                    ref={this.dropDownRef}
                >
                    <StyledLink to="/profile">
                        Profile
                    </StyledLink>
                    <StyledLink to="/profile">
                        Logout
                    </StyledLink>
                </DropDownContainer>
            </Header>
        );
    }
}

export default Navbar;