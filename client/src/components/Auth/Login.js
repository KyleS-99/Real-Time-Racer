import React, { Component } from 'react';
import styled from 'styled-components';

import InputField from '../common/InputField';
import Button from '../styled/Button';

class Login extends Component {
    state = {
        email: '',
        password: '',
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
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}

export default Login;