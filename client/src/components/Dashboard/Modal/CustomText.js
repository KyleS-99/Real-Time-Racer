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

const TextAreaContainer = styled.div`
	& *, & {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
`;

const TextArea = styled.textarea`
	resize: none;
	border: none;
	padding: 20px;
	background: #1e1e1e;
	outline: none;
	color: #fff;
	font-weight: 300;
	font-size: 14px;
`;

class CustomText extends Component {
	state = {
		wordTotal: 0,
		text: ''
	}
	onChange = (e) => {
		const target = e.target;

		// Set text to state, and calculate number of words
		this.setState({ 
			[target.name]: target.value,
			wordTotal: target.value.split(' ').length
		});
	}
	render() {
		// Get wordTotal, and text from state
		const { wordTotal, text } = this.state;

		return (
			<div>
				<ModalTitle text="Custom Test" closeModal={this.props.closeModal} />
				<Information>
					<TotalWords>total words: {wordTotal}</TotalWords>
					<SmallText>we don't store your custom test data</SmallText>
				</Information>
				<TextAreaContainer>
					<TextArea 
						placeholder="Enter Custom Text" 
						cols="53" 
						rows="20" 
						name="text"
						value={text} 
						onChange={this.onChange} 
					/>
				</TextAreaContainer>
			</div>
		); 
	}
}

export default CustomText;