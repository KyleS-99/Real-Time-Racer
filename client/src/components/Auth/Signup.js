import React, { Component } from 'react';
import styled from 'styled-components';

import InputField from '../common/InputField';
import Button from '../styled/Button';

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