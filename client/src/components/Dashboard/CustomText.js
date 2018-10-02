import React, { Component } from 'react';
import styled from 'styled-components';

import BorderLine from '../styled/BorderLine';

const ModalTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 18px;
`;

const ModalTitleParagraph = styled.p`
	color: #fff;
	text-transform: uppercase;
	font-weight: 300;
	font-size: 14px;
`;

const Img = styled.img`
	cursor: pointer;
	width: 40px;
`;

class CustomText extends Component {
	render() {
		return (
			<ModalTitle>
				<div>
					<ModalTitleParagraph>Custom Text</ModalTitleParagraph>
					<BorderLine />
				</div>
				<Img src={window.location.origin + '/img/x.png'} alt="Close" />
			</ModalTitle>
		);
	}
}

export default CustomText;