import React, { Component } from 'react';
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
    margin: 6px;
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(${props => props.src ? props.src : "https://i.imgur.com/O4mhvZf.png"});
    background-size: cover;
    background-position: center center;
    box-shadow: 0 8px 19px -1px rgba(0,0,0,.1);
    cursor: pointer;
    position: absolute;
    left: 50%;
    margin-left: -20px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 16px;
    text-transform: capitalize;

    &:hover {
        text-decoration: underline;
    }
`;

// <StyledLink to={`/tests/result/${id}`}>view details</StyledLink>
class Race extends Component {
    state = {  }
    render() {
        const { id, wpm, accuracy, auth: { user: { img } }, player } = this.props;

        console.log(this.props);

        return (
            <IndividualRace>
                <Avatar src={img} />
            </IndividualRace>
        );
    }
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