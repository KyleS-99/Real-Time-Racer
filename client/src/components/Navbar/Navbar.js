import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';

const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`;

const Cursor = styled.span`
    animation: ${blink} 0.7s infinite;
    margin: 0 5px;
    color: #000;
`;

const Header = styled.header`
    box-shadow: 0 7px 19px 0 rgba(0,0,0,.01);
    border-bottom: 1px solid #eee;
    overflow: hidden;
`;

const Nav = styled.nav`
    display: grid;
    grid-template-areas: "logo . . . avatar";
    justify-items: center;
    align-items: center;
`;

const StyledNavLink = styled(NavLink)`
    
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
`;

class Navbar extends Component {
    state = {  }
    render() {
        return (
            <Header>
                <Nav>
                    <StyledNavLink to="/dashboard">
                        <Logo>Real Time Racer<Cursor>|</Cursor></Logo>
                    </StyledNavLink>
                    <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d43ec18ec2cf6ff854513b9e8395c1e&auto=format&fit=crop&w=1350&q=80" />
                </Nav>
            </Header>
        );
    }
}

export default Navbar;