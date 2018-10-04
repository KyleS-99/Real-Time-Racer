import React from 'react';
import styled from 'styled-components';

import BorderLine from '../../styled/BorderLine';

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

const ModalTitle = (props) => (
    <ModalTitleContainer>
        <div>
            <ModalTitleParagraph>{props.text}</ModalTitleParagraph>
            <BorderLine />
        </div>
        <Img src={window.location.origin + '/img/x.png'} alt="Close" />
    </ModalTitleContainer>
);

export default ModalTitle;