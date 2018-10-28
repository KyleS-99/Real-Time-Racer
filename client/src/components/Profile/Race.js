import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const IndividualRace = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 350px;
    height: 120px;
    background: #fff;
    box-shadow: 0 9px 33px 0 rgba(0,0,0,.06);
    border-radius: 5px;
    margin: 25px 6px;
    padding: 6px;
    position: relative;
    
    & * {
        color: #696969;
        font-weight: 300;
    }

    &:hover {
        transform: translateY(-2px);
    }
`;

const Avatar = styled.div`
    grid-area: avatar;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-image: url(${props => props.src ? props.src : "https://i.imgur.com/O4mhvZf.png"});
    background-size: cover;
    background-position: center center;
    box-shadow: 0 8px 19px -1px rgba(0,0,0,.1);
    cursor: pointer;
    position: absolute;
    left: 50%;
    margin-left: -40px;
    top: -40px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 16px;
    text-transform: capitalize;
    position: relative;
    bottom: 5px;

    &:hover {
        text-decoration: underline;
    }
`;

const RaceInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 100%;
`;

const WPM = styled.h1`
    font-size: 30px;
`;

const WPMWord = styled.span`
    font-size: 20px;
    text-transform: uppercase;
`;

const Accuracy = styled.h1`
    font-size: 20px;
`;

const AccuracySymbol = styled.span`
    font-size: 15px;
    text-transform: capitalize;
`;

const Race = (props) => {
    const { id, wpm, accuracy, auth: { user: { img }, method }, player } = props;
    let enlargeImg;

    // Check if img is defined if so set enlargeImg to the url but add 200 as the size
    if (img && img !== '' && method === 'google') {
        enlargeImg = img.slice(0, -2) + '200';
    } else {
        enlargeImg = img;
    }

    return (
        <IndividualRace>
            <Avatar src={enlargeImg} />

            <RaceInfo>
                <WPM>{wpm} <WPMWord>wpm</WPMWord></WPM>

                <Accuracy>{accuracy}<AccuracySymbol>% Accuracy</AccuracySymbol></Accuracy>
            </RaceInfo>

            <StyledLink to={`/tests/result/${id}`}>view details</StyledLink>
        </IndividualRace>
    );
}


Race.propTypes = {
    id: PropTypes.string.isRequired,
    wpm: PropTypes.number.isRequired,
    accuracy: PropTypes.number.isRequired,
    player: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Race);