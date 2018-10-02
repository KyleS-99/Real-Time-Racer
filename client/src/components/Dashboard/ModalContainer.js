import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import Modal from './Modal'; 

const OuterModal = styled.div`
	width: 100%;
	height: 94vh;
	background: hsla(0, 0%, 100%, .8);
	position: fixed;
    z-index: 6;
    margin-top: -50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// ${props => props.display ? 'flex' : 'none'}

class ModalContainer extends Component {
	render() {
		// Get display from porps
		const { display, closeModal, children } = this.props;

		return (
			<OuterModal display={display}>
				<Modal closeModal={closeModal}>
					{children}
				</Modal>
			</OuterModal>
		);
	}
}


export default ModalContainer;