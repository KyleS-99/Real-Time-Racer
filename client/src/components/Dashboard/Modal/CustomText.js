import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ModalTitle from './ModalTitle';
import {  } from '../../../actions/modalActions';

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

const ButtonContainer = styled.div`
	background: #000;
	padding: 15px;
	margin-top: -5px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
`;

const Button = styled.button`
	padding: 10px 35px;
	text-transform: uppercase;
	background: #fff;
	border: none;
	border-radius: 50px;
	outline: none;
	cursor: pointer;
	transition: 0.2s;

	&:active {
		transform: scale(0.8);
	}
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
	submit = () => {

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

				<ButtonContainer>
					<Button 
						type="button"
						onClick={this.submit}
					>
						play
					</Button>
				</ButtonContainer>
			</div>
		); 
	}
}

export default connect(null)(CustomText);