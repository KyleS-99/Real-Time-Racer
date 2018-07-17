import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import { signupOrLogin } from '../../actions/authActions';

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
        const { email, password } = this.state;

        // Login credentials
        const loginCredentials = {
            email,
            password
        };

        this.props.signupOrLogin(loginCredentials, 'login', this.props.history);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({errors: this.props.errors});
        }
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
                    error={errors.loginEmail}  
                />
                <InputField 
                    onChange={this.onChange} 
                    value={this.state.password}
                    name="password"
                    type="password"
                    placeholder="Password" 
                    error={errors.loginPassword}  
                />
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    signupOrLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { signupOrLogin })(withRouter(Login));