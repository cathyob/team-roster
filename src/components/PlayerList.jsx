import React, { Component } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import Player from '../components/Player';
import PlayerModel from '../models/Player';

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
export default class PlayerList extends Component {
  listOfPlayers() {
    const players = [];
    for (let i = 0; i < this.props.players.length; i += 1) {
      const player = this.props.players[i];
      players.push(<Player
        key={i}
        number={i + 1}
        player={player}
        onDelete={this.props.onDelete}
      />);
    }
    return players;
  }

  render() {
    return (
      <List>
        {this.listOfPlayers()}
      </List>
    );
  }
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.instanceOf(PlayerModel)),
  onDelete: PropTypes.func,
};

PlayerList.defaultProps = {
  players: [],
  onDelete: () => {},
};
