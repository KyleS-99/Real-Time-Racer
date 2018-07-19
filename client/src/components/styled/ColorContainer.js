import styled from 'styled-components';

export const ColorBorder = styled.div`
    width: 100%;
    height: 5px;
    background-image: ${props => props.color}
    position: relative;
`;

export const Blur = styled.div`
    z-index: 1;
    filter: blur(10px);
    width: 100%;
    height: 5px;
    background-image: ${props => props.color}
    position: relative;
`;

export const Box = styled.div`
    width: 400px;
    height: 400px;
    background: #fff;
    margin: 2%;
    border: 1px solid #eee;
    box-shadow: 0px 28px 102px -1px rgba(0,0,0,0.05);
    transition: 0.2s;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0px 28px 102px -1px rgba(0,0,0,0.08);
    }
`;

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;