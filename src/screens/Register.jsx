import React, { Component } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import PageWrapper from '../components/PageWrapper';
import Images from '../assets/Images';
import PageTitle from '../components/PageTitle';
import PageError from '../components/Error';
import Input from '../components/Input';
import Button from '../components/Button';
import Network from '../logic/Network';
import Storage from '../logic/Storage';
import User from '../models/User';

const Form = styled.form`
    padding: 16px;
`;
export default class Register extends Component {
  constructor(props) {
    super(props);

    this.handleSend = this.handleSend.bind(this);

    this.state = {
      error: '',
    };
  }

  handleSend(event) {
    event.preventDefault();
    // chose to give one error message at a time
    // lets user focus on one issue to resolve
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (firstName.length === 0 ||
            lastName.length === 0 ||
            email.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0) {
      this.setState({
        error: 'Please fill in all information to form your team',
      });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({
        error: 'Your password and confirm password need to match',
      });
      return;
    }

    Network.registerUser(firstName, lastName, email, password, confirmPassword)
      .then((data) => {
        if (data.success) {
          Storage.setActiveUser(new User(data.user, data.token));
          this.props.history.push({
            pathname: '/roster',
          });
        } else {
          this.setState({
            error: 'Unable to register, try again later',
          });
        }
      })
      .catch((e) => {
        this.setState({
          error: e.toString(),
        });
      });
  }

  render() {
    return (
      <PageWrapper background={Images.FOOS_OVERHEAD.image}>
        <Form onSubmit={this.handleSend}>
          <PageTitle>Register Your Foosball League!</PageTitle>
          <PageError>{this.state.error}</PageError>
          <Input labelName="First Name" name="firstName" id="firstName" />
          <Input labelName="Last Name" name="lastName" id="lastName" />
          <Input labelName="Email" name="email" id="email" />
          <Input labelName="Password" name="password" id="password" secure />
          <Input labelName="Confirm Password" name="confirmPassword" id="confirmPassword" secure />
          <Button parameter="" color="Gold" id="register" submit>Register</Button>
        </Form>
      </PageWrapper>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Register.defaultProps = {
  history: {},
};
