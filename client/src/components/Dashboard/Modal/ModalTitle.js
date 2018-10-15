import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import BorderLine from '../../styled/BorderLine';
import { closeModal } from '../../../actions/modalActions';

const ModalTitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 18px 18px 0 18px;
`;

const ModalTitleParagraph = styled.p`
	color: #fff;
	text-transform: uppercase;
	font-weight: 300;
	font-size: 15px;
	margin: 0;
`;

const Img = styled.img`
	cursor: pointer;
	width: 40px;
`;

class ModalTitle extends Component {
	closeTheModal = () => {
		this.props.dispatch(closeModal());
	}
	render() {
		// Get data from props
		const { text } = this.props;

		return (
			<ModalTitleContainer>
				<div>
					<ModalTitleParagraph>{text}</ModalTitleParagraph>
					<BorderLine />
				</div>
				<Img 
					src={window.location.origin + '/img/x.png'} 
					alt="Close" 
					onClick={this.closeTheModal}
				/>
			</ModalTitleContainer>
		);
	}
} 

export default connect(null)(ModalTitle);