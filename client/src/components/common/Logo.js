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
    font-size: 1.5rem;
`;

export default Cursor;