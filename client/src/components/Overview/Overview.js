import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const OverviewContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 136px auto 0 auto;
`;

class Overview extends Component {
    state = {  }
    render() {
        return (
            <OverviewContainer>
                Overview
            </OverviewContainer>
        );
    }
}

Overview.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Overview);