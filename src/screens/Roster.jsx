import React, { Component } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import PageWrapper from '../components/PageWrapper';
import Images from '../assets/Images';
import PlayerList from '../components/PlayerList';
import PageTitle from '../components/PageTitle';
import PageError from '../components/Error';
import Button from '../components/Button';
import Player from '../models/Player';
import Network from '../logic/Network';
import Storage from '../logic/Storage';

const Roster = styled.div`
    text-align: center;
    button {
        margin-bottom: .67em;
    }
`;
export default class RosterPage extends Component {
  constructor(props) {
    super(props);

    this.clickToGo = this.clickToGo.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);

    this.state = {
      user: Storage.getActiveUser(),
      error: '',
      players: [],
    };
  }

  // wanted to be able to call getRoster within componentDidMount
  // so that when a player is deleted we can also getRoster again
  componentDidMount() { this.getRoster(); }

  getRoster() {
    Network.getPlayers(this.state.user.token)
      .then((data) => {
        if (data.success) {
          const listOfPlayers = [];
          for (let i = 0; i < data.players.length; i += 1) {
            const rosterPlayer = new Player(data.players[i]);
            listOfPlayers.push(rosterPlayer);
          }
          this.setState({
            players: listOfPlayers,
          });
        } else {
          this.setState({
            error: 'Unable to retrieve list of players, try again later',
          });
        }
      })
      .catch((e) => {
        this.setState({
          error: e.toString(),
        });
      });
  }

  clickToGo() {
    this.props.history.push({
      pathname: '/player/new',
    });
  }

  deletePlayer(id) {
    Network.deletePlayer(id, this.state.user.token)
      .then((data) => {
        if (data.success) {
          this.getRoster();
        } else {
          this.setState({
            error: 'Unable to delete, try again later',
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
        <Roster>
          <PageTitle>{`${this.state.user.getFullName()}'s Foosball League Roster!`}</PageTitle>
          <PageError>{this.state.error}</PageError>
          <Button parameter="" color="Crimson" fontColor="White" onClick={this.clickToGo}>+ Add Player</Button>
          <PlayerList players={this.state.players} onDelete={this.deletePlayer} />
        </Roster>
      </PageWrapper>
    );
  }
}

RosterPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

RosterPage.defaultProps = {
  history: {},
};
