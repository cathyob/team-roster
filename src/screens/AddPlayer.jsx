import React, { Component } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import PageWrapper from '../components/PageWrapper';
import Images from '../assets/Images';
import PageTitle from '../components/PageTitle';
import PageError from '../components/Error';
import Input from '../components/Input';
import Option from '../components/Option';
import Button from '../components/Button';
import Network from '../logic/Network';
import Storage from '../logic/Storage';

const Form = styled.form`
`;
export default class AddPlayer extends Component {
  constructor(props) {
    super(props);

    this.handleSend = this.handleSend.bind(this);

    this.state = {
      user: Storage.getActiveUser(),
      // error is mapped up from clickToGo state
      error: '',
    };
  }

  handleSend(event) {
    event.preventDefault();
    // chose to give one error message at a time
    // lets user focus on one issue to resolve
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const rating = event.target.rating.value;
    const handedness = event.target.enum.value.toLowerCase();

    if (firstName.length === 0 ||
        lastName.length === 0 ||
        rating.length === 0 ||
        handedness.length === 0) {
      this.setState({
        error: 'Please fill in all information to add your player',
      });
      return;
    }

    if (firstName.length > 30 ||
        lastName.length > 30) {
      this.setState({
        error: 'First and Last names can only be up to 30 characters each',
      });
      return;
    }

    // definte number as normal number with 10 vs 2 for binary or 16 for hex
    const ratingAsInt = parseInt(rating, 10);

    // don't allow saving player if the rating is not a integer between 0-10000
    if (Number.isNaN(ratingAsInt) || rating % 1 !== 0 || ratingAsInt < 0 || ratingAsInt > 10000) {
      this.setState({
        error: 'Please rate your player on a scale of 0-10000, as a whole number',
      });
      return;
    }

    Network.addPlayer(firstName, lastName, ratingAsInt, handedness, this.state.user.token)
      .then((data) => {
        if (data.success) {
          this.props.history.push({
            pathname: '/roster',
          });
        } else {
          this.setState({
            error: 'Unable to add a player, try again later',
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
      <PageWrapper background={Images.FOOS_CLOSEUP.image}>
        <Form onSubmit={this.handleSend}>
          <PageTitle>Add a Foosball Player to Your Roster!</PageTitle>
          <PageError>{this.state.error}</PageError>
          <Input labelName="First Name" name="firstName" id="firstName" />
          <Input labelName="Last Name" name="lastName" id="lastName" />
          <Input labelName="Rating" name="rating" id="rating" />
          <Option labelName="Handedness" name="enum" data={['Right', 'Left']} id="handedness" />
          <Button parameter="" color="Gold" id="create" submit>Add Player</Button>
        </Form>
      </PageWrapper>
    );
  }
}

AddPlayer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

AddPlayer.defaultProps = {
  history: {},
};
