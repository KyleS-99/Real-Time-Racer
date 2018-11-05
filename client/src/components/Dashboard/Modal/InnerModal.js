import React, { Component } from 'react';
import onClickoutside from 'react-onclickoutside';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

import { closeModal } from '../../../actions/modalActions';

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
		// Close modal if user clicks outside of modal
		if (this.props.modal.displayModal) {
			this.props.dispatch(closeModal());
		}
	}
	render() {
		return (
			<InnerModal>
				{this.props.children}
			</InnerModal>
		);
	}
}

const mapStateToProps = state => ({
	modal: state.modal
});

export default connect(mapStateToProps)(onClickoutside(Modal));