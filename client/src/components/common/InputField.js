import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputFieldContainer = styled.div`
    width: 100%;
    display: grid;
    justify-items: center;
    margin: 10px auto;
`;

const Input = styled.input`
    border: ${(props) => props.error !== undefined ? '1px solid #ff0066' : '1px solid #eee'}
    outline: none;
    font-size: 1.25rem;
    padding: .375rem .75rem;
    width: 100%;
    cursor: pointer
`;

const ErrorFeedback = styled.div`
    padding-top: 5px;
    color: #ff0066;
    font-size: 0.8rem;
    justify-self: start;
    position: relative;
    left: -10px;
`;

const InputField = ({ 
    name, 
    placeholder, 
    value, 
    error, 
    type, 
    onChange 
}) => (
    <InputFieldContainer>
        <Input 
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            value={value}
            error={error}
        />
        { 
            error &&
            <ErrorFeedback>
                {error}
            </ErrorFeedback> 
        }
    </InputFieldContainer>
);

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

InputField.defaultProps = {
    type: 'text'
};

export default InputField;