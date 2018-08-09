import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const OverviewContainer = styled.div`
    margin-top: 136px;
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

export default Overview;