import React, { Component } from 'react';
import styled from 'styled-components';
import onClickoutside from 'react-onclickoutside';

const ModalContainer = styled.div`
	display: ${props => props.display ? 'block' : 'none'}

`;

class Modal extends Component {
	handleClickOutside = () => {
		this.props.toggleModalDisplay();
	}
	render() {
		return (
			<ModalContainer>
				
			</ModalContainer>
		);
	}
}


export default Modal;