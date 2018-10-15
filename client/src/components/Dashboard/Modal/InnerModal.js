import React, { Component } from 'react';
import onClickoutside from 'react-onclickoutside';
import styled, { keyframes } from 'styled-components';

const Flop = keyframes`
	from {
		transform: translateY(0) perspective(1000px) rotateY( 15deg ) rotateX(10deg);
	}

	to {
		transform: translateY(0) perspective(1000px) rotateX(0deg);
	}
`;

const InnerModal = styled.div`
	position: relative;
	top: -25px;
	width: 400px;
    height: 400px;
    background: #000;
    margin-top: -50px;
    box-shadow: 0 10px 62px 4px rgba(0,0,0,.2);
    border-radius: 5px;
    animation: ${Flop};
    animation-duration: .5s;
    transition: all .2s ease-out;
`;

class Modal extends Component {
	handleClickOutside = () => {
		this.props.closeModal();
	}
	render() {
		return (
			<InnerModal>
				{this.props.children}
			</InnerModal>
		);
	}
}

export default onClickoutside(Modal);