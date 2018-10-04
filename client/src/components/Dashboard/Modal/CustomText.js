import React, { Component } from 'react';
import styled from 'styled-components';

import ModalTitle from './ModalTitle';

const Information = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 18px;

	& * {
		font-weight: 300;
		color: #fff;
	}
`;

const TotalWords = styled.p`
	font-size: 15px;
	text-transform: capitalize;
`;

const SmallText = styled.p`
	text-transform: uppercase;
	font-size: 10px;
`;

class CustomText extends Component {
	render() {
		return (
			<div>
				<ModalTitle text="Custom Test" />
				<Information>
					<TotalWords>total words: </TotalWords>
					<SmallText>we don't store your custom test data</SmallText>
				</Information>
			</div>
		); 
	}
}

export default CustomText;