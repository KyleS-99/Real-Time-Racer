import React, { Component } from 'react';
import styled from 'styled-components';

import InnerModal from './InnerModal'; 

const OuterModal = styled.div`
	width: 100%;
	height: 100%;
	background: hsla(0, 0%, 100%, .8);
	position: fixed;
	top: 0;
    z-index: 6;
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
				<InnerModal closeModal={closeModal}>
					{children}
				</InnerModal>
			</OuterModal>
		);
	}
}


export default ModalContainer;