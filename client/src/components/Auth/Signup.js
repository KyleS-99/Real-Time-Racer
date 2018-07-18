import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import { signupOrLogin } from '../../actions/authActions';

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
        const { first, last, email, password, password2 } = this.state;

        // Create new user
        const newUser = {
            first,
            last,
            email,
            password,
            password2
        };

        this.props.signupOrLogin(newUser, '/users/signup', this.props.history);
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
                    error={errors.signupEmail}  
                />
                <InputField 
                    onChange={this.onChange} 
                    value={this.state.password}
                    name="password"
                    type="password"
                    placeholder="Password" 
                    error={errors.signupPassword}  
                />
                <InputField 
                    onChange={this.onChange} 
                    value={this.state.password2}
                    name="password2"
                    type="password"
                    placeholder="Confirm Password" 
                    error={errors.signupPassword2}  
                />
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}

Signup.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    signupOrLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { signupOrLogin })(withRouter(Signup));