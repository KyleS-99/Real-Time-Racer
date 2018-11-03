import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import Modal from './Modal/Modal';
import CustomText from './Modal/CustomText';
import Multiplayer from './Modal/Multiplayer';
import { openModal } from '../../actions/modalActions';
import { RESET_DATA } from '../../actions/types';

import {
    Box,
    ColorBorder,
    Blur,
    ContentContainer
} from '../styled/ColorContainer';

const DashboardContainer = styled.div`
    display: flex;
    width: 100%;
    margin: 136px auto 80px auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 80%;

    @media (max-width: 1100px) {
        width: 100%;
    }
`;

const Title = styled.h1`
    font-size: 20px;
    color: #696969;
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: ${props => props.spacing}
`;

const Message = styled.p`
    margin-top: 55px;
    text-transform: uppercase;
    font-weight: 300;
`;

const Button = styled.button`
    margin-top: 60px;
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
    background-image: ${props => props.color}
    position: relative;
    z-index: 1;
    transition: .2s;
    outline: none;

    &:hover {
        cursor: pointer;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(4px);
        transform: scale(0.9);
    }
`;

const ButtonBlur = styled.div`
    background-image: ${props => props.color}
    width: 150px;
    height: 40px;
    position: relative;
    filter: blur(25px);
    margin-top: -20px;
    opacity: 0.3;
`;

class Dashboard extends Component {
    state = {
        displayModal: false,
        multiplayer: false,
        custom: false
    }
    toggleModalDisplay = () => {
        // Toggle the modal
        this.setState(prevState => ({ displayModal: !prevState.displayModal }));
    }
    componentDidUpdate(prevProps) {
        if (prevProps.displayModal !== this.props.displayModal) {
            this.setState(prevState => ({ 
                displayModal: this.props.displayModal,
                multiplayer: !this.props.displayModal ? false : prevState.multiplayer,
                custom: !this.props.displayModal ? false : prevState.custom
            }));
        }
    }
    whichModalShouldDisplay = (e) => {
        // Set which modal should display
        this.setState({ [e.target.dataset.modalName]: true });

        // Open modal
        this.props.dispatch(openModal());
    }
    practiceRace = () => {
        this.props.dispatch({
            type: RESET_DATA
        });
    }
    render() {
        const { displayModal, custom, multiplayer } = this.state;

        return (
            <DashboardContainer>
                <Modal
                    display={displayModal}
                >
                    {custom && <CustomText history={this.props.history} />}
                    {multiplayer && <Multiplayer history={this.props.history} />}
                </Modal>

                <Box>
                    <ColorBorder color="linear-gradient(-225deg, rgb(164, 69, 178), rgb(212, 24, 114) 52%, rgb(255, 0, 102));" />
                    <Blur color="linear-gradient(-225deg, rgb(164, 69, 178), rgb(212, 24, 114) 52%, rgb(255, 0, 102));" />
                    <ContentContainer>
                        <Title spacing="10px;">Practice Test</Title>
                        <Message>Practice by yourself</Message>
                        <div>
                            <Link to="/race">
                                <Button 
                                    color="linear-gradient(-225deg,#a445b2,#d41872 52%,#f06);"
                                    onClick={this.practiceRace}
                                >
                                    START
                                </Button>
                                <ButtonBlur color="linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%);" />
                            </Link>
                        </div>
                    </ContentContainer>
                </Box>

                <Box>
                    <ColorBorder color="linear-gradient(-225deg,#22e1ff,#1d8fe1 48%,#625eb1);" />
                    <Blur color="linear-gradient(-225deg,#22e1ff,#1d8fe1 48%,#625eb1);" />
                    <ContentContainer>
                        <Title spacing="6px;">Multiplayer Test</Title>
                        <Message>Race against others</Message>
                        <div>
                            <Button 
                                color="linear-gradient(-225deg,#22e1ff,#1d8fe1 48%,#625eb1);"
                                onClick={this.whichModalShouldDisplay}
                                data-modal-name="multiplayer"
                            >
                                START
                            </Button>
                            <ButtonBlur color="linear-gradient(-225deg,#22e1ff,#1d8fe1 48%,#625eb1);" />
                        </div>
                    </ContentContainer>
                </Box>

                <Box>
                    <ColorBorder color="linear-gradient(135deg,#f761a1 10%,#8c1bab);" />
                    <Blur color="linear-gradient(135deg,#f761a1 10%,#8c1bab);" />
                    <ContentContainer>
                        <Title spacing="6px;">Play With Friends</Title>
                        <Message>Invite a friend to a race</Message>
                        <div>
                            <Button 
                                color="linear-gradient(135deg,#f761a1 10%,#8c1bab);"
                            >
                                START
                            </Button>
                            <ButtonBlur color="linear-gradient(135deg,#f761a1 10%,#8c1bab);" />
                        </div>
                    </ContentContainer>
                </Box>

                <Box>
                    <ColorBorder color="linear-gradient(0deg,#b224ef 0,#7579ff);" />
                    <Blur color="linear-gradient(0deg,#b224ef 0,#7579ff);" />
                    <ContentContainer>
                        <Title spacing="10px;">Custom Test</Title>
                        <Message>Create your own custom test</Message>
                        <div>
                            <Button 
                                color="linear-gradient(0deg,#b224ef 0,#7579ff);"
                                onClick={this.whichModalShouldDisplay}
                                data-modal-name="custom"
                            >
                                START
                            </Button>
                            <ButtonBlur color="linear-gradient(0deg,#b224ef 0,#7579ff);" />
                        </div>
                    </ContentContainer>
                </Box>
            </DashboardContainer>
        );
    }
}

const mapStateToProps = ({ modal: { displayModal } }) => ({
    displayModal
});

export default connect(mapStateToProps)(Dashboard);