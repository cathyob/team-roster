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
export default class Login extends Component {
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
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email.length === 0 ||
            password.length === 0) {
      this.setState({
        error: 'Please fill in all information to login to your team',
      });
      return;
    }

    Network.loginUser(email, password)
      .then((data) => {
        if (data.success) {
          Storage.setActiveUser(new User(data.user, data.token));
          this.props.history.push({
            pathname: '/roster',
          });
        } else {
          this.setState({
            error: 'Unable to login, try again later',
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
          <PageTitle>Login to Your Foosball League!</PageTitle>
          <PageError>{this.state.error}</PageError>
          <Input labelName="Email" name="email" id="email" />
          <Input labelName="Password" name="password" id="password" secure />
          <Button parameter="" color="Gold" id="login" submit>Sign In</Button>
        </Form>
      </PageWrapper>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Login.defaultProps = {
  history: {},
};
