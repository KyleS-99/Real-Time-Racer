import styled, { keyframes } from 'styled-components';

const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`;

const Cursor = styled.span`
    animation: ${blink} 0.7s infinite;
    margin: 0 5px;
    color: #000;
    font-size: ${props => props.fontSize ? props.fontSize : '1.5rem'}
    background: transparent;
    color: ${props => props.color ? props.color : '#000'}
`;

export default Cursor;