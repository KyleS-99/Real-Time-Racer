import styled from 'styled-components';

export default styled.button`
    width: 150px;
    height: 40px;
    background: #fff;
    border:none;
    border-radius: 50px;
    color: #fff;
    font-family: 'Work Sans', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 300;
    background-image: linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%);
    position: relative;
    z-index: 1;
    transition: 0.2s;
    outline: none;
    display: block;
    margin: 2rem auto;

    &:hover {
        cursor: pointer;
        transform: translateY(-2px);
    }
`;