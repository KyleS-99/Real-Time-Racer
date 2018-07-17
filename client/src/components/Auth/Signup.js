import React, { Component } from 'react';
import styled from 'styled-components';
import InputField from '../common/InputField';

const Button = styled.button`
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

class Signup extends Component {
    state = {
        first: '',
        last: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit = (e) => {
        e.preventDefault();


    }
    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <InputField 
                    onChange={this.onChange} 
                    value={this.state.first}
                    name="first"
                    placeholder="First" 
                    error={errors.first}  
                />
                <InputField 
                    onChange={this.onChange} 
                    value={this.state.last}
                    name="last"
                    placeholder="Last" 
                    error={errors.last}  
                />
                <InputField 
                    onChange={this.onChange} 
                    value={this.state.email}
                    name="email"
                    placeholder="Email" 
                    error={errors.email}  
                />
                <InputField 
                    onChange={this.onChange} 
                    value={this.state.password}
                    name="password"
                    type="password"
                    placeholder="Password" 
                    error={errors.password}  
                />
                <InputField 
                    onChange={this.onChange} 
                    value={this.state.password2}
                    name="password2"
                    type="password"
                    placeholder="Confirm Password" 
                    error={errors.password2}  
                />
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}

export default Signup;